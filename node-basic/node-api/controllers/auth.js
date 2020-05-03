//! Controller

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

require('dotenv').config();

exports.signup = async (req, res) =>{
    console.log('hello bitch');
    const userExists = await User.findOne({
        email: req.body.email
    })

    if(userExists) return res.status(403).json({
        error: 'Email is taken'
    })
    console.log('we are in signup function');
    const user = await new User(req.body);
    await user.save();
    return res.status(200).json({
        user: user,
    })
};

exports.signin = (req, res) =>{

    //! find user based on email
    const {email, password} = req.body;
    
    User.findOne({email}, (err, user) =>{
        if(err || !user){
            return res.status(401).json({
                error: 'user with this email does not exist'
            });
        }

        //! if email exist, check the password
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'email and password do not match'
            });
        }

        //! generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        console.log('token : ' + token);

        //! persist the token as 't' in cookie with expire date
        res.cookie('t', token, {expire: new Date() + 9999});

        //! return response with user and token to client
        const {_id, name, email} = user
        return res.json({
            token,
            user: {_id, email, name}
        })
    });  
};

exports.signout = (req, res) =>{
    
    //! clear cookie
    res.clearCookie('t');
    return res.json({
        message: 'sign out success'
    });
}

exports.requireSignin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (authHeader != null){
        const token = authHeader && authHeader.split(' ')[1];
    
        if(token == null) return res.status(401);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
            if(err) return res.status(403);
            
            user_ = User.findOne({
                '_id' : user._id
            }).then((user) =>{
                req.user = user;
                console.log(req.user._id);
                next();
            }).catch((err) => res.status(401).json({
                error: 'invalid token'
            }));
        });
    }else{
        return res.status(401).json({
            error: 'un authorized'
        });
        next();
    }
}