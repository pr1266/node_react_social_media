const mongoClient = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = mongoClient.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

userSchema.virtual('password').set(
    function(password){
        //! create temporary var called password
        this._password = password;

        //! generate a timestamp
        this.salt = uuidv1();

        //! encrypt password
        this.hashed_password = this.encryptPassword(password);
    }
).get(
    function(){
        return this._password;
    }
)

//! methods:
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password){
        if(!password) return "";
        try{
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch(err){
            return "";
        }
    }
}

module.exports = mongoClient.model('User', userSchema);