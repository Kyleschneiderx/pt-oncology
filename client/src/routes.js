import React from 'react';
import {Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/quiz/index'
import Register from './components/User/register/register';
import Login from './components/User/login'
import MainLayout from './hoc/mainLayout'
import Admin from './components/admin';
import SignUp from './components/User/signup'
import QuizPage from './components/quiz/index';
import Auth from './hoc/auth'
import Intro from './components/User/register/introPage'


const Routes = () => (
    <BrowserRouter>
        <MainLayout>
            <Switch>

                <Route path='/quiz/:userId' component={Auth(QuizPage)}/>
                <Route path='/register/:userId' component={Auth(Register)}/>
                <Route path='/intro/:userId' component={Auth(Intro)}/>
                <Route path='/admin' component={Auth(Admin)}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/login' component={Login}/>
                <Route path='/' component={Home}/>
            </Switch>
        </MainLayout>
    </BrowserRouter>
)


export default Routes;