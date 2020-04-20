//! Controllers

const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');

const getPosts = (req, res) =>{
    const posts = Post.find().then(
        posts => {
            res.status(200).json({
                posts: posts
            })
        }
    ).catch(err => console.log(err));
}

const createPost = (req, res) =>{
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=> {
        //! check for errors:
        if(err){
            return res.status(400).json({
                error: 'image could not be uploaded'
            });
        }

        let post = new Post(fields);
        post.user = req.profile;
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) =>{
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
}

module.exports = {
    getPosts, createPost
};