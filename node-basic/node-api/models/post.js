const mongoClient = require('mongoose');
const { ObjectId } = mongoClient.Schema

const postSchema = mongoClient.Schema({
    title: {
        type: String,
        required: 'Title is required',
    },
    body: {
        type: String,
        required: 'Body is required',
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    user: {
        type: ObjectId,
        ref: "User",
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoClient.model('Post', postSchema);