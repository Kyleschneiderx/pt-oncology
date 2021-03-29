import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { connect } from 'react-redux'



// import DateTimePicker from 'react-widgets/lib/DateTimePicker'

import 'react-widgets/dist/css/react-widgets.css'



const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false



  const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />


const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit} className="ui form">

        <Field name="phoneNumber" type="text" component={renderField} label="Phone Number"/>
        
        <div className='field'>
        {/* <label>Date of Birth:</label> */}
        </div>

        {/* <Field name="DOB"  component={renderDatePicker} label="Date of Birth" name="dob"/>   */}
        <Field
          name="DOB"
          type="date"
          component={renderField}
          label="Date of Birth"
          initialValue={Date.now()}
          />

      <div>
        <br/>
        <button type="button" className="ui button primary" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="ui button primary">
          Continue
        </button>
      </div>
    </form>
  )
}


const formWrapped = reduxForm({
  form: 'register', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage)

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  userId: state.auth.userId
});



export default connect(mapStateToProps)(formWrapped)