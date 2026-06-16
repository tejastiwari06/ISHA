from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.prescription import router as prescription_router
from routes.scheduler import router as scheduler_router

app = FastAPI(
    title="Isha API — いしゃ",
    description="""
## Isha — AI Healthcare Platform

Built by **Tejas Tiwari**, B.Tech CSE, Gautam Buddha University, Greater Noida.

### Modules:
- **Prescription Reader** — Upload a photo of any handwritten prescription. AI reads it and returns medicines, dosage, timing, and simple explanation.
- **Duty Scheduler** — Enter doctors and leave dates. AI generates a fair, compliant 7-day duty roster.
    """,
    version="1.0.0",
    contact={
        "name": "Tejas Tiwari",
        "email": "tejastiwari@gbu.ac.in"
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    prescription_router,
    prefix="/prescription",
    tags=["Prescription Reader"]
)

app.include_router(
    scheduler_router,
    prefix="/scheduler",
    tags=["Duty Scheduler"]
)


@app.get("/", tags=["Root"])
def root():
    return {
        "app": "Isha",
        "japanese": "いしゃ",
        "meaning": "Doctor in Japanese",
        "tagline": "Where AI meets Indian healthcare",
        "developer": "Tejas Tiwari — GBU, Greater Noida",
        "status": "running ✅",
        "modules": {
            "prescription_reader": "/prescription/scan",
            "duty_scheduler": "/scheduler/generate"
        },
        "docs": "/docs"
    }
