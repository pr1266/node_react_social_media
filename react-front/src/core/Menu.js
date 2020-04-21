import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"};
    else return {color: "#ffffff"};
}

export const signout = (next) =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem('token');
        next();
        fetch('http://localhost:8080/signout', {
            method: 'GET'
        })
        .then(response => {
            console.log('sign out ', response);
            return response.json()
        })
        .catch(error => console.log(error));
    }
}

const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false
    }

    if(localStorage.getItem('token')){
        return JSON.parse(localStorage.getItem('token'));
    }
    else{
        return false;
    }
}

const Menu = ({history}) => (
    <div>
        <ul className='nav nav-tabs bg-primary'>
            
            {!isAuthenticated() && (
                <>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/' style={isActive(history, '/')}>Home</Link>
                    </li>
                    
                    <li className='nav-item'>
                        <Link className='nav-link' to='/signin' style={isActive(history, '/signin')}>Sign in</Link>
                    </li>

                    <li className='nav-item'>
                        <Link className='nav-link' to='/signup' style={isActive(history, '/signup')}>Sign up</Link>
                    </li>
                </>
            )}
            
            {isAuthenticated() && (
                <div>
                    <li className='nav-item'>
                        <a className='nav-link' onClick ={()=>signout(()=>history.push('/'))} style={isActive(history, '/'), {cursor: 'pointer', color: "#fff"}}>Signout</a>
                    </li>
                </div>
            )}

        </ul>
    </div>
);

export default withRouter(Menu);