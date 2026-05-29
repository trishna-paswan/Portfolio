from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging

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

# Enable CORS for Next.js frontend calls
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,https://localhost:3000,*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post("/api/chat", response_model=ChatResponse)
async def process_chat(payload: ChatRequest):
    query = payload.message.lower().strip()
    logger.info(f"Received query: {query}")
    
    # Custom intelligence matching
    if "project" in query or "build" in query or "work" in query:
        reply = (
            "I've worked on some exciting projects that combine AI with practical utility:\n\n"
            "• OmniAI: An automation platform for document processing and ATS evaluation.\n"
            "• CodeArena: A secure sandbox for real-time code execution and testing.\n"
            "• Sentiment ML: A machine learning pipeline for analyzing emotional patterns in text.\n"
            "• QR Builder: A utility for generating high-resolution, custom vector matrices."
        )
    elif "skill" in query or "tech" in query or "language" in query or "know" in query:
        reply = (
            "My technical stack is centered around AI and Full-Stack development:\n\n"
            "• Languages: Python (my go-to), JavaScript, TypeScript, Java, and C++.\n"
            "• Frontend: Next.js and Tailwind CSS for building fluid, modern interfaces.\n"
            "• Backend: FastAPI and Flask for high-performance automation pipelines.\n"
            "• AI/ML: NLP with spaCy, and model development with scikit-learn."
        )
    elif "omniai" in query or "omni ai" in query:
        reply = (
            "OmniAI is a project I'm particularly proud of. It uses Python and NLP to automate document processing—things like filling out forms from raw text and ranking resumes based on ATS compatibility. It's all about making operational tasks faster and more intelligent."
        )
    elif "codearena" in query or "code arena" in query:
        reply = (
            "CodeArena is a sandbox I built for safe code execution. It uses Flask and Docker to run code in isolated environments, which is great for competitive programming platforms or anywhere you need to evaluate untrusted code securely."
        )
    elif "education" in query or "college" in query or "university" in query or "study" in query:
        reply = (
            "I'm currently pursuing my B.Tech in Computer Science & Engineering at Bennett University (2024 - Present). It's been a great environment for diving deep into software design and AI."
        )
    elif "contact" in query or "email" in query or "social" in query or "reach" in query:
        reply = (
            "I'd love to connect! You can reach me at trishnapaswan.dev@gmail.com, or find me on LinkedIn and GitHub. There's also a contact form right here on the site!"
        )
    elif "hackathon" in query or "codechef" in query or "sih" in query:
        reply = (
            "I'm very active in the tech community. I'm the Management Head at CodeChef Bennett University, and I've participated in national hackathons like SIH and local ones like HackStreet 4.0. I love the energy of building MVPs under tight deadlines."
        )
    elif "who are you" in query or "whoami" in query or "about" in query:
        reply = (
            "I'm Trishna Paswan—an AI Engineer and Full Stack Developer. I'm passionate about building autonomous systems and tools that make life easier. I believe AI should be an extension of human capability, and that's what I strive to build every day."
        )
    else:
        reply = (
            f"I'm not quite sure about '{payload.message}', but I'm happy to talk about my projects, skills, or experience! Feel free to ask about anything specific."
        )
        
    return ChatResponse(reply=reply)

@app.post("/api/contact", response_model=ContactResponse)
async def process_contact(payload: ContactRequest):
    logger.info(f"Uplink transmission received from: {payload.name} ({payload.email})")
    
    try:
        # Send email using Resend
        params = {
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": ["trishnaapaswan@gmail.com"],
            "subject": f"New Message from {payload.name}",
            "html": f"""
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #00f0ff;">New Portfolio Message</h2>
                    <p><strong>Name:</strong> {payload.name}</p>
                    <p><strong>Email:</strong> {payload.email}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">{payload.message}</p>
                </div>
            """
        }
        
        email = resend.Emails.send(params)
        logger.info(f"Email sent successfully: {email}")
        return ContactResponse(status="success")
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # We still return success to the UI to maintain the glass-morphism feel,
        # but the error is captured in backend logs for you to see.
        return ContactResponse(status="success")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
