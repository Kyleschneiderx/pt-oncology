import React, {Component} from 'react';
import {auth} from '../store/actions/index';
import {connect} from 'react-redux';
import { convertColorToString } from 'material-ui/utils/colorManipulator';
import Cookies from 'universal-cookie';


export default function(ComposedClass, reload) {
    class AuthenticationCheck extends Component{

        // cookies = new Cookies();

        state={
            loading:true,
        }

        componentDidMount(){
            const cookie = new Cookies()
            // console.log(cookies.get("auth"))
            this.props.dispatch(auth(cookie.get('auth'))).then(response =>{

                let user = this.props.auth;

                this.setState({loading:false})
                if(!user){
                    if(reload){
                        this.props.history.push('/login');
                    }
                } else {
                    if(reload === false){
                        this.props.history.push('/admin')
                    }
                    
                }

            })
        }

        render(){
            if(this.state.loading){
                return <div className= "loader">Loading...</div>
            }else{
                return <ComposedClass {...this.props} user={this.props.user}/>
            }

        }
    
    }

    function mapStateToProps(state){
        return{
            token: state.auth.token,
            auth: state.auth.auth
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}