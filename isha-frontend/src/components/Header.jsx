import { Link } from 'react-router-dom'

export default function Header({ showBack = true }) {
  return (
    <header className="app-header">
      <Link to="/" className="brand">
        <span className="brand-mark">Isha</span>
        <span className="brand-kana">いしゃ</span>
      </Link>
      {showBack && (
        <Link to="/" className="back-link">← All modules</Link>
      )}
    </header>
  )
}
