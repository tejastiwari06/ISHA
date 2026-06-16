# Isha Frontend — いしゃ

React web app for Isha. Two separate pages:

- **Patient** (`/patient`) — upload a prescription photo, calls your backend's `POST /prescription/scan`
- **Admin** (`/admin`) — add doctors + leave days, calls your backend's `POST /scheduler/generate`

## 1. Make sure the backend is running first

In your `isha-backend` folder:

```
venv\Scripts\activate
uvicorn main:app --reload
```

It should be live at `http://127.0.0.1:8000`. Keep that terminal open.

## 2. Install and run the frontend

Open a **new** terminal window in this `isha-frontend` folder:

```
npm install
npm run dev
```

It will print a local URL, usually `http://localhost:5173`. Open that in your browser.

## 3. If your backend runs on a different address

Edit the `.env` file in this folder:

```
VITE_API_URL=http://127.0.0.1:8000
```

Change it to wherever your backend actually is (e.g. a Render.com URL), then restart `npm run dev`.

## Folder structure

```
isha-frontend/
├── index.html
├── .env                  <- backend URL goes here
├── src/
│   ├── main.jsx          <- app entry point, router setup
│   ├── App.jsx            <- page routes (/  /patient  /admin)
│   ├── api.js             <- all backend calls live here
│   ├── index.css          <- all styling (design tokens at the top)
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Stamp.jsx       <- the seal/stamp shown on completed results
│   └── pages/
│       ├── Home.jsx
│       ├── Patient.jsx
│       └── Admin.jsx
```

## For your demo

1. Have both terminals running (backend uvicorn, frontend npm run dev) before judges arrive.
2. Open http://localhost:5173 on the projector.
3. Patient flow: click the teal "Scan a prescription" card, upload a printed prescription image, click "Scan prescription".
4. Admin flow: click the marigold "Generate a duty roster" card, add 4-5 doctor names, type a leave date for one, click "Generate roster".

If the backend isn't running, the app shows a clear error message instead of crashing - worth showing judges that you handled that case.

## Building for submission / hosting

```
npm run build
```

This creates a dist/ folder you can deploy to Netlify, Vercel, or any static host, as long as VITE_API_URL points to a publicly reachable backend.
