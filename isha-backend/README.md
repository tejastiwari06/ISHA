# Isha — いしゃ
### AI Healthcare Platform
**Built by Tejas Tiwari | B.Tech CSE | Gautam Buddha University, Greater Noida**

---

## Setup (do this once)

```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate it
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Add your Gemini API key to .env file
# Get free key at: https://aistudio.google.com
```

## Run

```bash
uvicorn main:app --reload
```

Then open:
- **API root:** http://127.0.0.1:8000
- **Interactive docs:** http://127.0.0.1:8000/docs  ← test everything here

---

## API Endpoints

### Prescription Reader
`POST /prescription/scan`
- Upload any image of a handwritten prescription
- Returns: medicines, dosage, timing, precautions, simple explanation

### Duty Scheduler
`POST /scheduler/generate`
- Send list of doctors + leave dates
- Returns: 7-day fair duty roster + warnings

---

## Folder Structure

```
isha-backend/
├── main.py               ← entry point, run this
├── .env                  ← your Gemini API key (never share)
├── requirements.txt      ← all dependencies
├── routes/
│   ├── prescription.py   ← /prescription/scan endpoint
│   └── scheduler.py      ← /scheduler/generate endpoint
└── services/
    ├── gemini.py         ← all AI logic lives here
    └── firebase.py       ← Firestore integration (uncomment when ready)
```
