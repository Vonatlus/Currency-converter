import './CurrencyConverter.css'

export function CurrencyConverter({
  curriencies,
  value,
  currency,
  onValueChange,
  onCurrnencyChange
}) {
  return (
    <div className="card-size">
      <input
        className="input is-normal"
        type="number"
        value={(Math.round(value * 100)) / 100}
        onChange={(event) => { onValueChange(event.target.value) }}
      />
      <div className="select select-position">
        <select
          value={currency}
          onChange={(event) => { onCurrnencyChange(event.target.value) }}
        >
          {curriencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}