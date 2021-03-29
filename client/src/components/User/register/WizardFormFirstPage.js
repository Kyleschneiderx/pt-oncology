import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import {connect} from 'react-redux'

const WizardFormFirstPage = props => {

  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} className="ui form">
      
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
        />

      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
        />
      
      
      <Field
        name="email"
        type="text"
        component={renderField}
        label="Email"
      />

      <div>
        <button type="submit" className="ui button primary">
          Continue
        </button>
      </div>
    </form>
  )
}

const formWrapped = reduxForm({
  form: 'register', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  userId: state.auth.userId
});

export default connect()(formWrapped)