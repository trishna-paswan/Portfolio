export const portfolioData = {
  profile: {
    name: "Trishna Paswan",
    role: "AI Engineer / Full Stack Developer",
    location: "Greater Noida, India",
    education: "B.Tech in CSE, Bennett University (2024 - Present)",
    mission: "To build autonomous, highly intuitive systems using advanced machine learning.",
    email: "trishnapaswan.dev@gmail.com",
    github: "https://github.com/TrishnaPaswan",
    linkedin: "https://linkedin.com/in/trishna-paswan",
    leetcode: "https://leetcode.com/TrishnaPaswan",
    resume: "https://drive.google.com/file/d/1-Zwt3hag0z2vPHJE6t1k2doj7PpNY-aH/view?usp=sharing"
  },
  projects: [
    {
      id: 1,
      title: "OmniAI",
      subtitle: "Multi-Functional AI Automation & Extraction Platform",
      description: "A centralized AI portal utilizing NLP models and browser automation tools to automate paperless document processing, scoring, and text verification workloads.",
      tech: ["Python", "Flask", "Playwright", "NLP", "spaCy"],
      features: [
        "Google Form AutoFilling based on document text vectors.",
        "Resume Analysis & ATS grading matching job parameters.",
        "Plagiarism detection matching semantic similarity models.",
        "Intelligent text extraction and entity recognition engines."
      ],
      stats: [
        { label: "Accuracy", value: "94.8%" },
        { label: "Parsing Rate", value: "850 doc/min" },
        { label: "ATS Matching", value: "Cosine Similarity" }
      ],
      github: "https://github.com/TrishnaPaswan/OmniAI",
      telemetry: {
        endpoint: "/api/v1/extract",
        responseTime: "340ms",
        load: "0.24 CPU/t",
        lines: "2,430 lines"
      }
    },
    {
      id: 2,
      title: "CodeArena",
      subtitle: "Sandbox-based Coding Platform & Evaluation Engine",
      description: "A secure, containerized sandbox evaluation engine that executes code against user-defined tests and handles real-time submissions.",
      tech: ["Flask", "Tailwind CSS", "REST APIs", "Playwright", "Docker"],
      features: [
        "Real-time code compilation and output capture.",
        "Test-case validation with customized CPU execution limits.",
        "Secure shell environments preventing terminal execution escape.",
        "Robust user authentication and competitive programming leaderboards."
      ],
      stats: [
        { label: "Sandbox Latency", value: "120ms" },
        { label: "Isolation Level", value: "GVisor/Docker" },
        { label: "Concurrency", value: "1,200 requests/s" }
      ],
      github: "https://github.com/TrishnaPaswan/CodeArena",
      telemetry: {
        endpoint: "/api/v1/sandbox/execute",
        responseTime: "120ms",
        load: "0.45 CPU/t",
        lines: "4,120 lines"
      }
    },
    {
      id: 3,
      title: "Sentiment ML",
      subtitle: "Mental Health Sentiment & Pattern Recognition Model",
      description: "An AI-powered machine learning pipeline classifying cognitive distress signals and emotional states based on text input datasets.",
      tech: ["Python", "NLP", "Machine Learning", "scikit-learn", "Pandas"],
      features: [
        "Natural Language pre-processing pipelines (Stemming, Lemmatization).",
        "Feature engineering including TF-IDF and word embeddings.",
        "Robust pattern matching to isolate emotional indicators.",
        "Distress classification scoring with high recall rates."
      ],
      stats: [
        { label: "Model F1-Score", value: "0.89" },
        { label: "Recall Rate", value: "91.2%" },
        { label: "Parameters", value: "1.2M weights" }
      ],
      github: "https://github.com/TrishnaPaswan/Mental-Health-Sentiment-Analysis",
      telemetry: {
        endpoint: "/api/v1/model/classify",
        responseTime: "210ms",
        load: "0.15 CPU/t",
        lines: "1,890 lines"
      }
    },
    {
      id: 4,
      title: "Custom QR Code Builder",
      subtitle: "High-Resolution Custom Matrix Generator",
      description: "An automated utility providing high-resolution customizable vector matrix images with robust error correction mechanisms.",
      tech: ["Python", "qrcode-lib", "Pillow"],
      features: [
        "Customizable matrix colors and background padding.",
        "High-definition export layers (SVG / PDF / high-dpi PNG).",
        "Error correction level parameters adjustment.",
        "Lightweight API route matching local pipeline execution."
      ],
      stats: [
        { label: "Output DPI", value: "300 - 1200 DPI" },
        { label: "Build Speed", value: "15ms" },
        { label: "Library Engine", value: "qrcode-python" }
      ],
      github: "https://github.com/TrishnaPaswan/QR-Code-Generator",
      telemetry: {
        endpoint: "/api/v1/qr/generate",
        responseTime: "15ms",
        load: "0.02 CPU/t",
        lines: "450 lines"
      }
    }
  ],
  skills: [
    { category: "Languages", items: "Python, Java, C++, JavaScript, TypeScript" },
    { category: "Frontend", items: "Next.js, Tailwind CSS, HTML/CSS" },
    { category: "Backend", items: "FastAPI, Flask, REST APIs" },
    { category: "AI/ML", items: "Machine Learning, NLP, spaCy, scikit-learn" },
    { category: "DevOps", items: "Git, GitHub, Playwright, Render, Vercel, Supabase" }
  ],
  achievements: [
    "Management Head @ CodeChef BU (Organizing events & tech hackathons)",
    "Participant @ Smart India Hackathon (SIH National Finalists support)",
    "Participant @ HackStreet 4.0 Hackathon"
  ]
};
