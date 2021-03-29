import React from 'react';
import Header from '../components/Header'

const MainLayout = (props) => (   
    <> 
        <Header/>
        <div className='ui container'>
            {props.children}
        </div>
    </>
)

export default MainLayout;