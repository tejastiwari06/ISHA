import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">Isha</span>
          <span className="brand-kana">いしゃ</span>
        </div>
      </header>

      <section className="hero">
        <span className="hero-eyebrow">AI healthcare assistant — built for Indian hospitals</span>
        <h1>Read the <em>prescription</em>.<br />Run the <em>roster</em>.</h1>
        <p className="hero-sub">
          Isha turns a photo of a doctor's handwriting into clear medicine
          guidance for patients, and turns a list of doctors into a fair,
          rule-checked duty schedule for hospital admins.
        </p>
      </section>

      <div className="doors">
        <Link to="/patient" className="door door--patient">
          <span className="door-eyebrow">For patients</span>
          <h2>Scan a prescription</h2>
          <p>
            Upload a photo of your prescription. Isha reads the handwriting
            and explains every medicine in plain Hindi-English — dosage,
            timing, and what to watch out for.
          </p>
          <span className="door-arrow">Open prescription reader →</span>
        </Link>

        <Link to="/admin" className="door door--admin">
          <span className="door-eyebrow">For hospital admins</span>
          <h2>Generate a duty roster</h2>
          <p>
            Add your doctors, mark who's on leave, and Isha builds a
            7-day shift schedule that respects rest gaps and workload
            limits automatically.
          </p>
          <span className="door-arrow">Open duty scheduler →</span>
        </Link>
      </div>

      <footer className="app-footer">
        Isha · いしゃ · Built by Tejas Tiwari, B.Tech CSE, GBU
      </footer>
    </div>
  )
}
