import React, {Component} from 'react';
// import * as Yup from 'yup';

import { connect } from 'react-redux';
import { signUp, signIn, registerPatient, auth } from '../../../store/actions/index'
import PropTypes from 'prop-types'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'
import Cookies from 'universal-cookie';


// const LoginSchema = Yup.object().shape({
//     password:Yup.string()
//     .min(6," Too short")
//     .required("Required !!"),
//     email:Yup.string()
//     .email('Invalid Email :(')
//     .required("Required !!")
// })

 


class Register extends Component {
    
    constructor(props) {
      super(props)
      this.nextPage = this.nextPage.bind(this)
      this.previousPage = this.previousPage.bind(this)
      this.state = {
        page: 1,
        creatingPatient: false,
        userId:this.props.userId,
        finishSignup:false
      }
    }

    state ={
        success:false,
        validation: false,
        creatingPatient: false,
        userId:'908098980'

    }
    componentDidMount(){
        // this.setState({userId: this.props.userId})
        const cookie = new Cookies()
        const token = cookie.get('auth')
        console.log(this.props)
    }

    static getDerivedStateFromProps(props, state){

      const auth = props.createPatient
    
    
      if(auth){
          return{
              success: auth ? true : false
          }
      }
      return null;
    }

    componentDidUpdate(formValues){
        // console.log(this.state.creatingPatient)
        // if(this.state.creatingPatient === true){
        //     this.props.history.push(`/quiz/${this.state.userId}`);
        // }

        console.log(this.state.success)
        if(this.state.success){
          this.props.history.push(`/quiz/${this.state.userId}/`);
        }
    }

    nextPage() {
      this.setState({ page: this.state.page + 1 })
    }
  
    previousPage() {
      this.setState({ page: this.state.page - 1 })
    }

    route(props){
      console.log("made it")
    }


  

 
    render() {
      
      const {userId} = this.state
      const { registerPatient } = this.props;
      const { onSubmit } = this.props
      const { page } = this.state
      const { submitting } = this.props


      return (
        <div>
          {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}
          {page === 2 && (
            <WizardFormSecondPage
              previousPage={this.previousPage}
              onSubmit={this.nextPage}
              // initialValues={{userId: userId}} 
            />
          )}
          {page === 3 && (
            <WizardFormThirdPage
              previousPage={this.previousPage}
              onSubmit={registerPatient}
            />
          )}
        </div>
      )
    }

}
  
Register.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    createPatient: state.auth.createPatient
});
  
export default connect(mapStateToProps,{
    signUp, signIn, registerPatient
})(Register)


