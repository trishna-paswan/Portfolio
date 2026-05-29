from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend-server")

app = FastAPI(
    title="Trishna Paswan AI Portfolio Backend",
    description="Futuristic AI chatbot processing endpoints for Trishna's developer ecosystem.",
    version="1.0.0"
)

# Enable CORS for specific origins only
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [o.strip() for o in raw_origins.split(",") if o.strip()]
if "http://localhost:3000" not in allowed_origins:
    allowed_origins.append("http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.get("/")
def read_root():
    return {"status": "ACTIVE", "description": "TRISHNA_AI_CORE_RUNNING"}

from chatbot_logic import get_response

@app.post("/api/chat", response_model=ChatResponse)
async def process_chat(payload: ChatRequest):
    logger.info(f"Received query: {payload.message}")
    reply = get_response(payload.message)
    return ChatResponse(reply=reply)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
