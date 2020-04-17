const mongoClient = require('mongoose');

const postSchema = mongoClient.Schema({
    title: {
        type: String,
        required: 'Title is required',
    },
    body: {
        type: String,
        required: 'Body is required',
    }
});

module.exports = mongoClient.model('Post', postSchema);