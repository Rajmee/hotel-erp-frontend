import React from 'react'

export default function RadioButton({label, ...rest}) {
  return (
    <div className="form-check">
        <input type="radio" className="form-check-input"  {...rest} />
        <label className="form-check-label">{label}</label>
    </div>
  )
}
