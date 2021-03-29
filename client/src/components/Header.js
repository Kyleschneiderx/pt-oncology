import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

const Header =(props)=>{



    if(props.isSignedIn){
        return(
            <div className="ui secondary pointing menu">
                <Link to='/' className='item'>
                    Connect By LCPT
                </Link>
                <div className="right menu">
                <Link to='/' className='item'>
                    Logout
                </Link>
                </div>
            </div>

        )
    }

    return(
        <div className="ui secondary pointing menu">
            <Link to='/' className='item'>
            Connect By LCPT
            </Link>
            <div className="right menu">
            <Link to='/login' className='item'>
                Login
            </Link>
            <Link to='/signup' className="item">
                Sign Up
            </Link>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps)(Header);