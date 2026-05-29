from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging
import time

import os
import resend
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Resend
resend.api_key = os.getenv("RESEND_API_KEY")

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Simple in-memory rate limiting (IP-based)
rate_limit_store = {}

def is_rate_limited(ip: str, limit: int = 5, window: int = 60) -> bool:
    now = time.time()
    if ip not in rate_limit_store:
        rate_limit_store[ip] = []
    
    # Filter out old requests
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if now - t < window]
    
    if len(rate_limit_store[ip]) >= limit:
        return True
    
    rate_limit_store[ip].append(now)
    return False

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

class ContactResponse(BaseModel):
    status: str

@app.get("/")
def read_root():
    return {"status": "ACTIVE", "description": "TRISHNA_AI_CORE_RUNNING"}

from chatbot_logic import get_response

@app.post("/api/chat", response_model=ChatResponse)
async def process_chat(payload: ChatRequest):
    logger.info(f"Received query: {payload.message}")
    reply = get_response(payload.message)
    return ChatResponse(reply=reply)

@app.post("/api/contact", response_model=ContactResponse)
async def process_contact(transmission: ContactRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    
    # Rate limit: 3 messages per 5 minutes per IP
    if is_rate_limited(client_ip, limit=3, window=300):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(status_code=429, detail="Too many messages. Please try again later.")

    logger.info(f"Uplink transmission received from: {transmission.name} ({transmission.email})")
    
    try:
        if not resend.api_key:
            raise ValueError("RESEND_API_KEY is not configured")

        # Send email using Resend
        params = {
            "from": os.getenv("PORTFOLIO_EMAIL_FROM", "onboarding@resend.dev"),
            "to": ["trishnaapaswan@gmail.com"],
            "subject": f"New Message from {transmission.name}",
            "html": f"""
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #00f0ff;">New Portfolio Message</h2>
                    <p><strong>Name:</strong> {transmission.name}</p>
                    <p><strong>Email:</strong> {transmission.email}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">{transmission.message}</p>
                </div>
            """
        }
        
        email = resend.Emails.send(params)
        logger.info(f"Email sent successfully: {email}")
        return ContactResponse(status="success")
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail="Transmission failed. Please try again later or contact me directly via email.")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
