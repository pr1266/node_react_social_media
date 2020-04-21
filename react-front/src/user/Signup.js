import React, { Component } from 'react';

class Signup extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    render(){
        return(
            <div>
                <h2>Sign up</h2>
            </div>
        );
    }
}

export default Signup