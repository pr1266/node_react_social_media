import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Signin extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }


    authenticate(jwt, next){
        if(typeof window !== "undefined"){
            localStorage.setItem('token', JSON.stringify(jwt));
            next();
        }
    }

    //! handle change of text inputs
    handleChange = (_name) => (event) => {
        console.log(this.state);
        this.setState({
            error: "",
            [_name]: event.target.value
        });
    }


    //! handle submit event
    clickSubmit = event =>{
        event.preventDefault();
        this.setState({
            loading: true
        });
        const {email, password} = this.state;
        const user = {
            email,
            password
        }
        
        this.signin(user)
        .then(data => {
            if(data.error){
                this.setState({
                    error: data.error, loading: false
                });
            } else{
                //! khob inja bayad redirect konim
                //! vali aval authenticate mikonim

                this.authenticate(data, ()=>{
                    this.setState({
                        redirectToReferer: true
                    })
                });

            }
        });
    }

    signin = (user) =>{
        //! using fetch:
        return fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .catch(err => console.log(err.body));
    }

    signinForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="text" className='form-control' value={email}/>
            </div>
            
            <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={this.handleChange("password")} type="password" className= 'form-control' value={password}/>
            </div>

            <div className="form-group">
            <button onClick = {this.clickSubmit} className="btn btn-raised btn-primary">
                Submit
            </button>
            </div>
        </form>
    )

    render(){
        const {email, password, error, redirectToReferer, loading} = this.state;
        
        if(redirectToReferer){
            return <Redirect to='/' />
        }
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Sign in</h2>
                
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>{error}</div>
                {loading ? (<div className="jumbotron text-center">
                    <h1>loading...</h1>
                </div>) : ("")}
                {this.signinForm(email, password)}
            
            </div>
        );
    }
}

export default Signin