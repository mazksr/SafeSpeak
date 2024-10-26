from pydantic import BaseModel
from typing import Optional
from enums import Sentiment

class KomentarCreate(BaseModel):
    Komentar: str
    Sentimen: Sentiment
    HS: Optional[bool] = False
    Abusive: Optional[bool] = False
    HS_Individual: Optional[bool] = False
    HS_Group: Optional[bool] = False
    HS_Religion: Optional[bool] = False
    HS_Race: Optional[bool] = False
    HS_Physical: Optional[bool] = False
    HS_Gender: Optional[bool] = False
    HS_Other: Optional[bool] = False
    HS_Weak: Optional[bool] = False
    HS_Moderate: Optional[bool] = False
    HS_Strong: Optional[bool] = False

# Pydantic model for comment response
class KomentarResponse(KomentarCreate):
    Id: int

    class Config:
        orm_mode = True