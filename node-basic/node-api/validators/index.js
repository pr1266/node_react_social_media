

exports.createPostValidator = (req, res, next) => {
    //! inja baraye title
    req.check('title', 'Write a title').notEmpty;
    req.check('title', 'title must be at least 4 characters and 150 characters at most').isLength({
        min: 4,
        max: 150
    });
    
    //! inja baraye body
    req.check('body', 'Write a body').notEmpty;
    req.check('body', 'body must be at least 4 characters and 2000 characters at most').isLength({
        min: 4,
        max: 2000
    });

    //! check for errors
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error) => error.msg)[0];

        return res.status(400).json({
            error: firstError
        });
    }
    next();
}


exports.userSignupValidator = (req, res, next) => {
    //! Name is not null and between 3 and 10 chars
    req.check('name', 'Name is required').notEmpty();

    //! check for email
    //TODO not null and valid email

    req.check('email', 'Email should not be null').matches(/.+\@.+\..+/).withMessage('enter a valid email').isLength({ min: 4, max: 2000});

    //! check for password
    req.check('password', 'password is required').isLength({ min: 6, max: 50});
    //! check for errors
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error) => error.msg)[0];

        return res.status(400).json({
            error: firstError
        });
    }
    next();
}