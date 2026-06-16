"""
Firebase service — Isha
Connect Firestore for saving prescriptions and rosters.

Setup steps:
1. Go to https://console.firebase.google.com
2. Create project -> "Isha"
3. Project Settings -> Service Accounts -> Generate New Private Key
4. Save the downloaded JSON as firebase_credentials.json in this folder
5. Uncomment the code below
"""

# import firebase_admin
# from firebase_admin import credentials, firestore
# import os

# cred = credentials.Certificate("firebase_credentials.json")
# firebase_admin.initialize_app(cred)
# db = firestore.client()

# def save_prescription(user_id: str, data: dict):
#     db.collection("users").document(user_id).collection("prescriptions").add(data)

# def get_prescriptions(user_id: str):
#     docs = db.collection("users").document(user_id).collection("prescriptions").stream()
#     return [doc.to_dict() for doc in docs]

# def save_roster(hospital_id: str, data: dict):
#     db.collection("hospitals").document(hospital_id).collection("rosters").add(data)
