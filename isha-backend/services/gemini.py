from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
import io

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def read_prescription(image_bytes: bytes) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type="image/jpeg"
            ),
            """You are a medical AI assistant in India.
            This is a doctor's handwritten prescription.
            Return clean JSON:
            {
              "medicines": [
                {
                  "name": "medicine name",
                  "dosage": "e.g. 500mg",
                  "timing": "morning/night etc",
                  "duration": "e.g. 5 days",
                  "before_after_food": "before/after food",
                  "precautions": "any warnings"
                }
              ],
              "doctor_notes": "other instructions",
              "simple_explanation": "simple Hindi-English explanation"
            }"""
        ]
    )
    return response.text


def generate_duty_roster(doctors: list, leaves: dict, days: int = 7) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[f"""
        You are a hospital duty scheduling AI for an Indian hospital.
        Doctors available: {doctors}
        Doctors on leave: {leaves}
        Generate a {days}-day duty roster.
        Rules:
        - Max 2 night shifts per doctor per week
        - Min 12 hour gap between shifts
        - Each shift needs min 2 doctors
        - Distribute workload fairly
        Return clean JSON:
        {{
          "roster": [
            {{
              "day": "Monday",
              "date": "2025-06-11",
              "morning": ["Dr. Name1"],
              "evening": ["Dr. Name2"],
              "night": ["Dr. Name3"]
            }}
          ],
          "warnings": ["any warnings"],
          "summary": "brief summary"
        }}
        """]
    )
    return response.text