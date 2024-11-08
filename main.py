import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import komentar_router
from utils import load_model
@asynccontextmanager
async def lifespan(inner_app: FastAPI):
    inner_app.state.tokenizer, inner_app.state.model = load_model("indobert-finetuned")
    inner_app.state.semaphore = asyncio.Semaphore(8)
    yield
    print("Shutting down")
app = FastAPI(lifespan=lifespan)

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
