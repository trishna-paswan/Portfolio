# Define chatbot responses as a dictionary for easier management
RESPONSES = {
    "projects": {
        "keywords": ["project", "build", "work"],
        "reply": (
            "I've worked on some exciting projects that combine AI with practical utility:\n\n"
            "• OmniAI: An automation platform for document processing and ATS evaluation.\n"
            "• CodeArena: A secure sandbox for real-time code execution and testing.\n"
            "• Sentiment ML: A machine learning pipeline for analyzing emotional patterns in text.\n"
            "• QR Builder: A utility for generating high-resolution, custom vector matrices."
        )
    },
    "skills": {
        "keywords": ["skill", "tech", "language", "know"],
        "reply": (
            "My technical stack is centered around AI and Full-Stack development:\n\n"
            "• Languages: Python (my go-to), JavaScript, TypeScript, Java, and C++.\n"
            "• Frontend: Next.js and Tailwind CSS for building fluid, modern interfaces.\n"
            "• Backend: FastAPI and Flask for high-performance automation pipelines.\n"
            "• AI/ML: NLP with spaCy, and model development with scikit-learn."
        )
    },
    "omniai": {
        "keywords": ["omniai", "omni ai"],
        "reply": (
            "OmniAI is a project I'm particularly proud of. It uses Python and NLP to automate document processing—things like filling out forms from raw text and ranking resumes based on ATS compatibility. It's all about making operational tasks faster and more intelligent."
        )
    },
    "codearena": {
        "keywords": ["codearena", "code arena"],
        "reply": (
            "CodeArena is a sandbox I built for safe code execution. It uses Flask and Docker to run code in isolated environments, which is great for competitive programming platforms or anywhere you need to evaluate untrusted code securely."
        )
    },
    "education": {
        "keywords": ["education", "college", "university", "study"],
        "reply": (
            "I'm currently pursuing my B.Tech in Computer Science & Engineering at Bennett University (2024 - Present). It's been a great environment for diving deep into software design and AI."
        )
    },
    "contact": {
        "keywords": ["contact", "email", "social", "reach"],
        "reply": (
            "I'd love to connect! You can reach me at trishnapaswan.dev@gmail.com, or find me on LinkedIn and GitHub. There's also a contact form right here on the site!"
        )
    },
    "credentials": {
        "keywords": ["hackathon", "codechef", "sih"],
        "reply": (
            "I'm very active in the tech community. I'm the Management Head at CodeChef Bennett University, and I've participated in national hackathons like SIH and local ones like HackStreet 4.0. I love the energy of building MVPs under tight deadlines."
        )
    },
    "about": {
        "keywords": ["who are you", "whoami", "about"],
        "reply": (
            "I'm Trishna Paswan—an AI Engineer and Full Stack Developer. I'm passionate about building autonomous systems and tools that make life easier. I believe AI should be an extension of human capability, and that's what I strive to build every day."
        )
    }
}

def get_response(query: str) -> str:
    query = query.lower().strip()
    for key, data in RESPONSES.items():
        if any(keyword in query for keyword in data["keywords"]):
            return data["reply"]
    return (
        f"I'm not quite sure about '{query}', but I'm happy to talk about my projects, skills, or experience! Feel free to ask about anything specific."
    )
