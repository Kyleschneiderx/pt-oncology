import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/index';

class Login extends React.Component {
  state ={
    success:false,
    validation: false,

}
componentDidMount(){
    console.log(this.props)
}

static getDerivedStateFromProps(props, state){

    const auth = props.isSignedIn


    if(auth){
        return{
            success: auth ? true : false
        }
    }
    return null;
}

componentDidUpdate(props){
    console.log(this.state.success)
    if(this.state.success){
        this.props.history.push('/admin');
    }
}
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.signIn(formValues);
    console.log(formValues)
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="email" component={this.renderInput} label="Email" />
        <Field
          name="password"
          component={this.renderInput}
          label="Password"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'You must enter a email';
  }

  if (!formValues.password) {
    errors.password = 'You must enter a password';
  }

  return errors;
};

const formWrapped = reduxForm({
  form: 'LoginForm',
  validate
})(Login);

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});


export default connect(
  mapStateToProps,
  { signIn }
)(formWrapped);