// The signature element of the Isha design system: a rubber-stamp seal,
// echoing the doctor's stamp on a real Indian prescription and the official
// seal on an approved hospital roster. Used once per page, on the moment
// a result is confirmed — not as decoration.
export default function Stamp({ variant = 'patient', label, caption, sub }) {
  return (
    <div className="stamp-wrap">
      <div className={`stamp stamp--${variant}`}>
        <span className="stamp-text">{label}</span>
      </div>
      <div className="stamp-caption">
        <strong>{caption}</strong>
        {sub}
      </div>
    </div>
  )
}
