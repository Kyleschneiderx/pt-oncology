import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import logo from '../../../svg/LCPT.jpeg';
import family from '../../../svg/family.jpg';

import {connect} from 'react-redux'



class IntroPage extends Component{



    render(){
        return (
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to Lake City PT Oncology screening</h2>
              </div>
              <div className="ui raised very padded text container segment">
                <p> Lake City PT certified and trained experts provide an integrated, patient-centered treatment model combining state-of-the-art technology with effective treatment options.
                Lake City PT is committed to wellness and getting you back to life... regaining movement, reclaiming quality of life, while improving your overall health.</p>
                <img src={family} className="ui fluid rounded image" />
                <br/>
                {/* <p>LCPT utilizes A.I. to find the best rehabilitation program based on patients needs and goals.</p> */}
                <p>Clicking continue below to answer a few questions and start your rehab journey</p>
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                <Link to={`/register/${this.props.userId}`}>
                <button className="ui inverted primary button" >
                    Continue
                </button>
                </Link>

                </div>

            </div>
              <div>
                 
              </div>
            </div>
        );
    }
}



function mapStateToProps(state){
    return {
        userId: state.auth.userId,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(IntroPage);

