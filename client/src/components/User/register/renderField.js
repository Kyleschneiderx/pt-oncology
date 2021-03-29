import React from 'react'

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  
  const className = `field ${error && touched ? 'error': ''}`
  return(
    <div className={className}>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>

  )

}

export default renderField