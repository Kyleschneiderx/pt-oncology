const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'Required'
    }
    if (!values.diagnosis) {
      errors.diagnosis = 'Required'
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Required'
    }
    if (!values.doctor) {
        errors.doctor = 'Required'
    }
    return errors
  }
  
export default validate