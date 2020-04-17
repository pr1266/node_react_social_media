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