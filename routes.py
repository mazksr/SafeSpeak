from fastapi import Cookie, APIRouter, Request, Depends, HTTPException, status, Response, Query
from sqlalchemy.exc import IntegrityError
from database import SessionLocal, get_db
from enums import Sentiment
from models import Komentar
from schemas import KomentarCreate, KomentarResponse
from utils import predict_text
from typing import List, Optional
from auth import LoginRequest, USERNAME, PASSWORD, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, verify_token
from datetime import timedelta
import pandas as pd
import io

komentar_router = APIRouter()

@komentar_router.get("/protected")
def protected_route(username: str = Depends(verify_token)):
    return {"message": f"Hello, {username}. You have access to this protected route."}
@komentar_router.post("/login")
def login(login_data: LoginRequest):
    # Check if the username and password are correct
    if login_data.username != USERNAME or login_data.password != PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create a JWT token if credentials are correct
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": login_data.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}
@komentar_router.post("/predict")
async def preditct(req: Request, db: SessionLocal = Depends(get_db)):
    request = await req.json()
    comment = request.get("comment")
    async with req.app.state.semaphore:
        predicted_labels = predict_text(comment, req.app.state.model, req.app.state.tokenizer)
    is_positive = True if sum(predicted_labels) == 0 else False

    komentar_data = KomentarCreate(
        Komentar=comment[:255],
        Sentimen="Positive" if is_positive else "Negative",
        HS=bool(predicted_labels[0]),  # HS classification
        Abusive=bool(predicted_labels[1]),  # Abusive classification
        HS_Individual=bool(predicted_labels[2]),  # Add similar logic for other labels
        HS_Group=bool(predicted_labels[3]),
        HS_Religion=bool(predicted_labels[4]),
        HS_Race=bool(predicted_labels[5]),
        HS_Physical=bool(predicted_labels[6]),
        HS_Gender=bool(predicted_labels[7]),
        HS_Other=bool(predicted_labels[8]),
        HS_Weak=bool(predicted_labels[9]),
        HS_Moderate=bool(predicted_labels[10]),
        HS_Strong=bool(predicted_labels[11])
    )

    try:
        db_komentar = Komentar(**komentar_data.model_dump())
        db.add(db_komentar)
        db.commit()
    except IntegrityError as e:
        if "Duplicate entry" in str(e.orig):
            print(f"Comment: \"{comment[:255]}\" already exists, skipping save")
        else:
            print(e)

    return {"message": predicted_labels, "isPositive": is_positive}

@komentar_router.get("/history", response_model=List[KomentarResponse])
def read_komentars(
    db: SessionLocal = Depends(get_db),
    username: str = Depends(verify_token),
    sentiment: Optional[Sentiment] = Query(None, description="Filter by Sentimen"),
    hs: Optional[bool] = Query(None, description="Filter by HS"),
    abusive: Optional[bool] = Query(None, description="Filter by Abusive"),
    hs_individual: Optional[bool] = Query(None, description="Filter by HS_Individual"),
    hs_group: Optional[bool] = Query(None, description="Filter by HS_Group"),
    hs_religion: Optional[bool] = Query(None, description="Filter by HS_Religion"),
    hs_race: Optional[bool] = Query(None, description="Filter by HS_Race"),
    hs_physical: Optional[bool] = Query(None, description="Filter by HS_Physical"),
    hs_gender: Optional[bool] = Query(None, description="Filter by HS_Gender"),
    hs_other: Optional[bool] = Query(None, description="Filter by HS_Other"),
    hs_weak: Optional[bool] = Query(None, description="Filter by HS_Weak"),
    hs_moderate: Optional[bool] = Query(None, description="Filter by HS_Moderate"),
    hs_strong: Optional[bool] = Query(None, description="Filter by HS_Strong"),
    search_query: Optional[str] = Query(None, description="Search term for Komentar text"),
    limit: int = Query(10, description="Limit results per page"),
    offset: int = Query(0, description="Offset for pagination"),
):
    # Start with the base query
    query = db.query(Komentar)

    # Apply filters if provided
    if sentiment:
        query = query.filter(Komentar.Sentimen == sentiment)
    if hs is not None:
        query = query.filter(Komentar.HS == hs)
    if abusive is not None:
        query = query.filter(Komentar.Abusive == abusive)
    if hs_individual is not None:
        query = query.filter(Komentar.HS_Individual == hs_individual)
    if hs_group is not None:
        query = query.filter(Komentar.HS_Group == hs_group)
    if hs_religion is not None:
        query = query.filter(Komentar.HS_Religion == hs_religion)
    if hs_race is not None:
        query = query.filter(Komentar.HS_Race == hs_race)
    if hs_physical is not None:
        query = query.filter(Komentar.HS_Physical == hs_physical)
    if hs_gender is not None:
        query = query.filter(Komentar.HS_Gender == hs_gender)
    if hs_other is not None:
        query = query.filter(Komentar.HS_Other == hs_other)
    if hs_weak is not None:
        query = query.filter(Komentar.HS_Weak == hs_weak)
    if hs_moderate is not None:
        query = query.filter(Komentar.HS_Moderate == hs_moderate)
    if hs_strong is not None:
        query = query.filter(Komentar.HS_Strong == hs_strong)

    # Apply text search if query is provided
    if search_query:
        query = query.filter(Komentar.Komentar.contains(search_query))

    # Apply pagination
    komentar_list = query.offset(offset).limit(limit).all() if limit >0 else query.offset(offset).all()

    return komentar_list

@komentar_router.delete("/history/{komentar_id}", response_model=dict)
def delete_komentar(komentar_id: int, db: SessionLocal = Depends(get_db), username: str = Depends(verify_token)):
    komentar = db.query(Komentar).filter(Komentar.Id == komentar_id).first()
    if not komentar:
        raise HTTPException(status_code=404, detail="Komentar not found")
    db.delete(komentar)
    db.commit()
    return {"message": f"Comment with id {komentar_id} has been deleted"}

@komentar_router.put("/history/{komentar_id}", response_model=dict)
async def update_komentar(req: Request, komentar_id: int, db: SessionLocal = Depends(get_db), username: str = Depends(verify_token)):
    request = await req.json()
    komentar = db.query(Komentar).filter(Komentar.Id == komentar_id).first()

    if not komentar:
        raise HTTPException(status_code=404, detail="Komentar not found")

    komentar_value = request.get("komentar")[:255]
    komentar.Komentar = komentar_value
    is_positive = request.get("is_positive")
    komentar.Sentimen = "Positive" if is_positive else "Negative"
    komentar.Sentimen = "Positive" if is_positive else "Negative"
    komentar.HS = request.get("HS") if request.get("HS") else False
    komentar.Abusive = request.get("Abusive") if request.get("Abusive") else False
    komentar.HS_Individual = request.get("HS_Individual") if request.get("HS_Individual") else False
    komentar.HS_Group = request.get("HS_Group") if request.get("HS_Group") else False
    komentar.HS_Religion = request.get("HS_Religion") if request.get("HS_Religion") else False
    komentar.HS_Race = request.get("HS_Race") if request.get("HS_Race") else False
    komentar.HS_Physical = request.get("HS_Physical") if request.get("HS_Physical") else False
    komentar.HS_Gender = request.get("HS_Gender") if request.get("HS_Gender") else False
    komentar.HS_Other = request.get("HS_Other") if request.get("HS_Other") else False
    komentar.HS_Weak = request.get("HS_Weak") if request.get("HS_Weak") else False
    komentar.HS_Moderate = request.get("HS_Moderate") if request.get("HS_Moderate") else False
    komentar.HS_Strong = request.get("HS_Strong") if request.get("HS_Strong") else False

    db.commit()
    db.refresh(komentar)

    return {"message": "Komentar updated"}


@komentar_router.get("/download-csv")
async def download_csv(db: SessionLocal = Depends(get_db), access_token: str = Cookie(None)):
    verify_token(access_token)
    # Step 1: Query the database
    komentar_list = db.query(Komentar).all()

    # Step 2: Convert SQLAlchemy result to a Pandas DataFrame
    data = [
        {
            **komentar.__dict__,
            "Sentimen": komentar.Sentimen.value,  # Enum to string
            "HS": int(komentar.HS),
            "Abusive": int(komentar.Abusive),
            "HS_Individual": int(komentar.HS_Individual),
            "HS_Group": int(komentar.HS_Group),
            "HS_Religion": int(komentar.HS_Religion),
            "HS_Race": int(komentar.HS_Race),
            "HS_Physical": int(komentar.HS_Physical),
            "HS_Gender": int(komentar.HS_Gender),
            "HS_Other": int(komentar.HS_Other),
            "HS_Weak": int(komentar.HS_Weak),
            "HS_Moderate": int(komentar.HS_Moderate),
            "HS_Strong": int(komentar.HS_Strong)
        }
        for komentar in komentar_list
    ]
    df = pd.DataFrame(data)  # Convert each row to a dict
    df = df.drop(columns='_sa_instance_state')  # Drop SQLAlchemy internal column if exists

    # Step 3: Convert DataFrame to CSV
    output = io.StringIO()
    df.to_csv(output, index=False)
    output.seek(0)

    # Step 4: Send CSV file as a response
    headers = {
        "Content-Disposition": "attachment; filename=komentar_list.csv"
    }
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers=headers
    )