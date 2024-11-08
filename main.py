from concurrent.futures import ProcessPoolExecutor
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import komentar_router
from utils import load_model
@asynccontextmanager
async def lifespan(inner_app: FastAPI):
    # Load the tokenizer and model once
    if not hasattr(inner_app.state, "tokenizer"):
        inner_app.state.tokenizer, inner_app.state.model = load_model("indobert-finetuned")
        inner_app.state.model.eval()  # Set to evaluation mode
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

# Include routers
app.include_router(komentar_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=80)
