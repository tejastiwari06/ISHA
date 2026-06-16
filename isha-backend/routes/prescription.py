from fastapi import APIRouter, UploadFile, File
from services.gemini import read_prescription
import json
import re

router = APIRouter()


@router.post("/scan")
async def scan_prescription(file: UploadFile = File(...)):
    """
    Upload a photo of a handwritten prescription.
    Isha AI reads it and returns medicines, dosage, timing, and explanation.
    """
    try:
        image_bytes = await file.read()
        result = read_prescription(image_bytes)

        # Clean markdown fences if Gemini wraps response in ```json
        cleaned = re.sub(r"```json|```", "", result).strip()

        return {
            "success": True,
            "data": json.loads(cleaned)
        }
    except json.JSONDecodeError:
        # If JSON parsing fails, return raw text still usable
        return {
            "success": True,
            "data": {"raw_response": result},
            "note": "Could not parse as JSON, raw AI response returned"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
