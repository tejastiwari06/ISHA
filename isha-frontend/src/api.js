// All calls go to your FastAPI backend (the isha-backend project).
// By default this points at your local server. If you deploy the backend
// somewhere else (e.g. Render.com), set VITE_API_URL in a .env file here.
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function parseResponse(res) {
  let body
  try {
    body = await res.json()
  } catch {
    throw new Error('The server sent back something unexpected. Is the backend running?')
  }
  if (!res.ok) {
    throw new Error(body?.error || `Request failed (${res.status})`)
  }
  if (body?.success === false) {
    throw new Error(body?.error || 'The backend reported an error.')
  }
  return body
}

export async function scanPrescription(file) {
  const formData = new FormData()
  formData.append('file', file)

  let res
  try {
    res = await fetch(`${API_URL}/prescription/scan`, {
      method: 'POST',
      body: formData,
    })
  } catch {
    throw new Error('Could not reach the backend. Make sure uvicorn is running on ' + API_URL)
  }
  return parseResponse(res)
}

export async function generateRoster(doctors, leaves, days = 7) {
  let res
  try {
    res = await fetch(`${API_URL}/scheduler/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctors, leaves, days }),
    })
  } catch {
    throw new Error('Could not reach the backend. Make sure uvicorn is running on ' + API_URL)
  }
  return parseResponse(res)
}
