import { useState } from 'react'
import Header from '../components/Header.jsx'
import Stamp from '../components/Stamp.jsx'
import { generateRoster } from '../api.js'

export default function Admin() {
  const [doctors, setDoctors] = useState([
    { name: '', leaveText: '' },
  ])
  const [days, setDays] = useState(7)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [result, setResult] = useState(null)
  const [newName, setNewName] = useState('')

  function addDoctor() {
    const name = newName.trim()
    if (!name) return
    setDoctors([...doctors, { name, leaveText: '' }])
    setNewName('')
  }

  function updateLeave(index, value) {
    const next = [...doctors]
    next[index].leaveText = value
    setDoctors(next)
  }

  function removeDoctor(index) {
    setDoctors(doctors.filter((_, i) => i !== index))
  }

  async function handleGenerate() {
    const validDoctors = doctors.filter((d) => d.name.trim())
    if (validDoctors.length < 2) {
      setErrorMsg('Add at least 2 doctors to build a roster.')
      setStatus('error')
      return
    }

    const leaves = {}
    validDoctors.forEach((d) => {
      const dates = d.leaveText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      if (dates.length) leaves[d.name.trim()] = dates
    })

    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await generateRoster(validDoctors.map((d) => d.name.trim()), leaves, Number(days) || 7)
      setResult(res.data)
      setStatus('done')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="app-shell">
      <Header />

      <div className="module--admin">
        <div className="module-head">
          <span className="module-eyebrow">Duty scheduler</span>
          <h1>Build this week's roster in seconds</h1>
          <p>Add your doctors, note any leave days, and Isha distributes shifts fairly while respecting rest-gap rules.</p>
        </div>

        <div className="panel">
          <span className="field-label">Add a doctor</span>
          <div className="add-row">
            <input
              className="text-input"
              type="text"
              placeholder="e.g. Dr. Sharma"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addDoctor()}
            />
            <button className="btn btn--marigold btn--small" onClick={addDoctor}>Add</button>
          </div>

          <div className="doctor-list">
            {doctors.filter((d) => d.name.trim()).length === 0 && (
              <div className="empty-state">No doctors added yet</div>
            )}
            {doctors.map((d, i) => d.name.trim() && (
              <div className="doctor-row" key={i}>
                <span className="doctor-name">{d.name}</span>
                <input
                  className="leave-input"
                  type="text"
                  placeholder="Leave dates, e.g. 2026-06-18, 2026-06-19 (optional)"
                  value={d.leaveText}
                  onChange={(e) => updateLeave(i, e.target.value)}
                />
                <button className="remove-btn" onClick={() => removeDoctor(i)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="days-input-row">
            <span className="field-label" style={{ margin: 0 }}>Roster length (days)</span>
            <input
              className="days-input"
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>

          <div className="btn-row">
            <button
              className="btn btn--marigold"
              onClick={handleGenerate}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Building roster…' : 'Generate roster'}
            </button>
          </div>

          {status === 'loading' && (
            <div className="status-line is-loading">
              <span className="spinner" /> Asking Isha to balance shifts and leave days…
            </div>
          )}
          {status === 'error' && (
            <div className="status-line is-error">⚠ {errorMsg}</div>
          )}
        </div>

        {result && (
          <div className="panel">
            <Stamp
              variant="admin"
              label="Roster approved"
              caption="Schedule generated"
              sub={<>{result.roster?.length || 0}-day roster ready</>}
            />

            {result.summary && <p className="roster-summary">{result.summary}</p>}

            <table className="roster-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Morning</th>
                  <th>Evening</th>
                  <th>Night</th>
                </tr>
              </thead>
              <tbody>
                {result.roster?.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <span className="roster-day">{row.day}</span>
                      <span className="roster-date">{row.date}</span>
                    </td>
                    <td>{(row.morning || []).map((n, j) => <span className="shift-pill" key={j}>{n}</span>)}</td>
                    <td>{(row.evening || []).map((n, j) => <span className="shift-pill" key={j}>{n}</span>)}</td>
                    <td>{(row.night || []).map((n, j) => <span className="shift-pill" key={j}>{n}</span>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {result.warnings?.length > 0 && (
              <div className="warnings-box">
                <h4>Worth a look</h4>
                <ul>
                  {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="app-footer">
        Isha · いしゃ · Always have a human supervisor review the final roster.
      </footer>
    </div>
  )
}
