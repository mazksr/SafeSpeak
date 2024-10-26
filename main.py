from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import komentar_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(komentar_router)

# Run the app using `uvicorn main:app --reload`
