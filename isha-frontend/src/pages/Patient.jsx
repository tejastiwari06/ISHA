import { useState, useRef } from 'react'
import Header from '../components/Header.jsx'
import Stamp from '../components/Stamp.jsx'
import { scanPrescription } from '../api.js'

export default function Patient() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | error | done
  const [errorMsg, setErrorMsg] = useState('')
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreviewUrl(URL.createObjectURL(f))
    setResult(null)
    setStatus('idle')
  }

  async function handleScan() {
    if (!file) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await scanPrescription(file)
      setResult(res.data)
      setStatus('done')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  function reset() {
    setFile(null)
    setPreviewUrl(null)
    setResult(null)
    setStatus('idle')
    setErrorMsg('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="app-shell">
      <Header />

      <div className="module--patient">
        <div className="module-head">
          <span className="module-eyebrow">Prescription reader</span>
          <h1>What did the doctor actually write?</h1>
          <p>Upload a photo of a handwritten prescription. Isha reads it and explains each medicine in plain language.</p>
        </div>

        <div className="panel">
          <label
            className={`upload-zone ${file ? 'has-file' : ''}`}
            htmlFor="prescription-upload"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Prescription preview" className="preview-thumb" />
            ) : null}
            <span className="upload-zone-label">
              {file ? file.name : 'Click to choose a prescription photo'}
            </span>
            <span className="upload-zone-hint">JPG or PNG · clear, well-lit photo works best</span>
            <input
              ref={inputRef}
              id="prescription-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          <div className="btn-row">
            <button
              className="btn btn--teal"
              onClick={handleScan}
              disabled={!file || status === 'loading'}
            >
              {status === 'loading' ? 'Reading prescription…' : 'Scan prescription'}
            </button>
            {(file || result) && (
              <button className="btn btn--ghost" onClick={reset}>Start over</button>
            )}
          </div>

          {status === 'loading' && (
            <div className="status-line is-loading">
              <span className="spinner" /> Sending the image to Isha's AI reader…
            </div>
          )}
          {status === 'error' && (
            <div className="status-line is-error">⚠ {errorMsg}</div>
          )}
        </div>

        {result && (
          <div className="panel">
            <Stamp
              variant="patient"
              label="Read by Isha"
              caption="Prescription decoded"
              sub={<>{result.medicines?.length || 0} medicine(s) identified</>}
            />

            <div className="med-grid">
              {result.medicines?.map((med, i) => (
                <div className="med-card" key={i}>
                  <h3>{med.name}</h3>
                  <div className="med-row"><span>Dosage</span><span>{med.dosage || '—'}</span></div>
                  <div className="med-row"><span>Timing</span><span>{med.timing || '—'}</span></div>
                  <div className="med-row"><span>Duration</span><span>{med.duration || '—'}</span></div>
                  <div className="med-row"><span>Food</span><span>{med.before_after_food || '—'}</span></div>
                  {med.precautions && (
                    <div className="med-row"><span>Caution</span><span>{med.precautions}</span></div>
                  )}
                </div>
              ))}
            </div>

            {result.doctor_notes && (
              <p className="notes-line"><strong>Doctor's notes:</strong> {result.doctor_notes}</p>
            )}

            {result.simple_explanation && (
              <div className="explain-box">
                <h4>In plain words</h4>
                <p>{result.simple_explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="app-footer">
        Isha · いしゃ · This is not a substitute for medical advice from your doctor or pharmacist.
      </footer>
    </div>
  )
}
