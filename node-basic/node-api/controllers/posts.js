//! Controllers

const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const postById = (req, res, next, id) =>{
    console.log('im here');
    Post.findById(id)
    .populate('user', '_id name')
    .exec((err, post) =>{
        if(err || !post) return res.status(400).json({error: err});

        req.post = post;

        console.log('post of request : ' + post);
        next();
    });
}

const getPosts = (req, res) =>{
    const posts = Post.find().populate("user", "_id name").then(
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
        req.profile.salt = undefined;
        req.profile.hashed_password = undefined;
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


const postByUser = (req, res) =>{
    Post.find({user: req.profile._id})
    .populate('user', 'id_ name')
    .sort('_created')
    .exec((err, posts) =>{
        if(err) return res.status(400).json({error: err});

        res.json(posts);
    });
}

const isPoster = (req, res, next) =>{
    let isPoster = req.post.user._id.toString == req.user._id.toString;

    console.log('req.post.user._id : ' + req.post.user._id);
    console.log('req.user._id : ' + req.user._id);

    if(!isPoster){
        return res.status(403).json({error: 'Forbiden for you'});
    }

    next();
}

const updatePost = (req, res, next) =>{
    let post = req.post;
    post = _.extend(post, req.body);
    post.save(err => {
        if(err) return res.status(400).json({error: err});
        res.json(post);
    });
}

const deletePost = (req, res) =>{
    let post = req.post;
    post.remove((err, post)=>{
        if(err) return res.status(400).json({error: err});

        res.status(204).json({message: 'post deleted successfully'});
    });
}

module.exports = {
    getPosts, createPost, postByUser, postById, isPoster, deletePost, updatePost
};