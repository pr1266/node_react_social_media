import React, { Component } from 'react';

class Signup extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
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
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        }
        
        this.signup(user)
        .then(data => {
            if(data.error){
                this.setState({
                    error: data.error
                });
            } else{
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    open: true
                });
            }
        });
    }

    signup = (user) =>{
        //! using fetch:
        return fetch("http://localhost:8080/signup", {
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

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className='form-control' value={name}/>
            </div>
            
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
        const {name, email, password, error, open} = this.state;
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Sign up</h2>
                
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>{error}</div>
                <div className="alert alert-info" style={{display: open ? "" : "none"}}>sign up successfull</div>
            
                {this.signupForm(name, email, password)}
            
            </div>
        );
    }
}

export default Signup