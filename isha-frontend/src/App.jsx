import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Patient from './pages/Patient.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
