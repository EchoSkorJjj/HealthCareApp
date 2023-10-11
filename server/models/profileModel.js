const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String, 
        default: "" 
    },
    recipeBook: {
        type: Array,
        default: []
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Profile', profileSchema);
