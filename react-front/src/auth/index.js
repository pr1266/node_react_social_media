export const signup = (user) =>{
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

export const signin = (user) =>{
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

export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem('token', JSON.stringify(jwt));
        next();
    }
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

export const isAuthenticated = () =>{
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
