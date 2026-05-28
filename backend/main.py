from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging

import os

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
            "Trishna has built several impressive applications:\n"
            "1. OmniAI: A Flask-based automation dashboard for Google forms, Resume analysis, ATS scoring, and Plagiarism check.\n"
            "2. CodeArena: A sandbox code evaluation system with real-time compilation and user databases.\n"
            "3. Sentiment ML: An NLP pipeline classifying distress patterns inside mental health texts.\n"
            "4. QR Code Builder: A custom DPI high-resolution vector matrices exporter."
        )
    elif "skill" in query or "tech" in query or "language" in query or "know" in query:
        reply = (
            "Trishna's operational stack includes:\n"
            "- Programming: Python, Java, C++, JavaScript, TypeScript\n"
            "- Frontend: Next.js, Tailwind CSS, HTML, CSS\n"
            "- Backend: FastAPI, Flask, REST API architectures\n"
            "- AI/ML: Machine Learning models, NLP patterns, spaCy, scikit-learn\n"
            "- Tools: Git/GitHub, Playwright browser automations, Supabase database, Render, Vercel deployments."
        )
    elif "omniai" in query or "omni ai" in query:
        reply = (
            "OmniAI is one of Trishna's flagship projects built using Python, Flask, Playwright, and NLP libraries. "
            "It features automated form submissions, document parsing, resume score ranking (ATS compatibility), "
            "and semantic similarity checks. It automates repetitive operational document data tasks."
        )
    elif "codearena" in query or "code arena" in query:
        reply = (
            "CodeArena is a sandbox-based coding site built with Flask, Tailwind, and REST APIs. "
            "It allows real-time code executions under isolated sandboxes, validations of CPU limits, and "
            "test-case score validations, making it a robust platform for competitive programming."
        )
    elif "education" in query or "college" in query or "university" in query or "study" in query:
        reply = (
            "Trishna is pursuing a B.Tech in Computer Science & Engineering from Bennett University, "
            "Greater Noida, India (Timeline: 2024 - Present). She maintains high academic and leadership standings "
            "within student communities."
        )
    elif "contact" in query or "email" in query or "social" in query or "reach" in query:
        reply = (
            "You can contact Trishna via:\n"
            "- Email: trishnapaswan.dev@gmail.com\n"
            "- LinkedIn: linkedin.com/in/trishna-paswan\n"
            "- GitHub: github.com/TrishnaPaswan\n"
            "- LeetCode: leetcode.com/TrishnaPaswan\n"
            "Feel free to use the uplink contact form below as well!"
        )
    elif "hackathon" in query or "codechef" in query or "sih" in query:
        reply = (
            "Trishna's leadership highlights:\n"
            "- Management Head at CodeChef Bennett University Chapter: Administered programming events and tech bootcamps.\n"
            "- Smart India Hackathon: Finalist support building national ministry solution prototypes.\n"
            "- HackStreet 4.0: 36-hour sprint coding full-stack automation MVPs."
        )
    elif "who are you" in query or "whoami" in query or "about" in query:
        reply = (
            "I am Trishna_AI, a dedicated portfolio assistant representation of Trishna Paswan. "
            "Trishna is an AI Engineer and Full Stack Developer focusing on scalable automation and cognitive interfaces."
        )
    else:
        reply = (
            f"Query logged inside AI Core. I'm currently running a localized search index. "
            f"Regarding '{payload.message}', you can check Trishna's 'Projects', 'Skills', "
            f"'Education', or 'Contact info' for details!"
        )
        
    return ChatResponse(reply=reply)

@app.post("/api/contact", response_model=ContactResponse)
async def process_contact(payload: ContactRequest):
    logger.info(f"Uplink transmission received from: {payload.name} ({payload.email})")
    logger.info(f"Message content: {payload.message}")
    # Here, we would integrate emails sending or database storage (Supabase logic)
    return ContactResponse(status="success")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
