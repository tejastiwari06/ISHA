from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini import generate_duty_roster
from typing import List, Dict
import json
import re

router = APIRouter()


class RosterRequest(BaseModel):
    doctors: List[str]
    leaves: Dict[str, List[str]]  # e.g. {"Dr. Sharma": ["2025-06-12", "2025-06-13"]}
    days: int = 7

    class Config:
        json_schema_extra = {
            "example": {
                "doctors": ["Dr. Sharma", "Dr. Gupta", "Dr. Rao", "Dr. Singh", "Dr. Verma"],
                "leaves": {
                    "Dr. Gupta": ["2025-06-12"],
                    "Dr. Rao": ["2025-06-14", "2025-06-15"]
                },
                "days": 7
            }
        }


@router.post("/generate")
async def generate_roster(request: RosterRequest):
    """
    Enter doctors and their leave dates.
    Isha AI generates a fair, compliant 7-day duty roster.
    """
    try:
        result = generate_duty_roster(
            request.doctors,
            request.leaves,
            request.days
        )

        cleaned = re.sub(r"```json|```", "", result).strip()

        return {
            "success": True,
            "data": json.loads(cleaned)
        }
    except json.JSONDecodeError:
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
