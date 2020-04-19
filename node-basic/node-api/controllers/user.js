const User = require('../models/user');

exports.userById = (req, res, next, id) =>{
    User.findById(id).exec((err, user) =>{
        if(err || !user){
            return res.status(400).json({
                message: 'User Not Found'
            });
        }
        req.profile = user //! adds profile object in request with user info
        next();
    });
}

exports.hasAuthorization = (req, res, next) =>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    console.log('auth token : ' + authorized);
    if(! authorized){
        return res.status(403).json({
            message: 'forbiden ! user is not authorized to perform this action'
        });
    }
}

exports.allUsers = (req, res) =>{
    User.find((err, users) =>{
        if(err){
            return res.status(400).json({
                error: err
            });
        } else{
            return res.status(200).json({
                users
            });
        }
    })
}