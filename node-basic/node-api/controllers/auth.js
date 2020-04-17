const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

require('dotenv').config();

exports.signup = async (req, res) =>{
    const userExists = await User.findOne({
        email: req.body.email
    })

    if(userExists) return res.status(403).json({
        error: 'Email is taken'
    })

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
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET) + '@PR1266';
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

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
});