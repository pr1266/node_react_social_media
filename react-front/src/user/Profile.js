import React, { Component } from 'react'
import {isAuthenticated} from '../auth';
import {Redirect, Link} from 'react-router-dom';

class Profile extends Component {
    
    constructor(){
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init = userId =>{

        fetch(`http://localhost:8080/user/${userId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            } 
        })
        .then( response => {
            return response.json()
        })
        .then(data => {
            if(data.error){
                this.setState({redirectToSignin: true});
            } else{
                console.log('no problem');
                this.setState({user: data});
            }

            //console.log(data);
        });
    }

    componentDidMount(){

        
        //! user ID :
        const userId = this.props.match.params.userId;
        this.init(userId);
        console.log('kir e khar');
        console.log(isAuthenticated().user)
        console.log('kir e khar');
        console.log(this.state)
        console.log(isAuthenticated().user._id == this.state.userId);
    }

    render(){

        const {redirectToSignin, user} = this.state;
        if(redirectToSignin) return <Redirect to = '/signin' />

        return(
            <div className = 'container'>
                <div className = 'row'>
                    <div className = "col-md-6">
                        <h2 className = "my-5 mb-5">Profile</h2>
                        <p>Hello {isAuthenticated().user.name}</p>
                        <p>Email {isAuthenticated().user.email}</p>
                        <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                    </div>

                    <div className = "col-md-6">
                        {isAuthenticated().user && isAuthenticated().user._id == user._id && (
                            <div className = "d-inline-block mt-5">
                                <Link className = 'btn btn-raised btn-success mr-5' to = {`/user/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                
                                <button className = 'btn btn-raised btn-danger'>
                                    Delete Profile
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}


export default Profile