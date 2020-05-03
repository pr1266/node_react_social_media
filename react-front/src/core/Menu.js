import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth'
const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"};
    else return {color: "#ffffff"};
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
                <>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/' style={isActive(history, '/')}>Home</Link>
                    </li>
                
                    <li className='nav-item'>
                        <a className='nav-link' onClick ={()=>signout(()=>history.push('/signin'))} style={isActive(history, '/'), {cursor: 'pointer', color: "#fff"}}>Signout</a>
                    </li>
                    <li className='nav-item'>
                        <Link className = "nav-link" to = {`/user/${isAuthenticated().user._id}`} style={{color: 'white'}}>{ `${isAuthenticated().user.name}'s profile`}</Link>
                    </li>
            
                </>
            )}

        </ul>
    </div>
);

export default withRouter(Menu);