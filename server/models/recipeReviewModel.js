const mongoose = require('mongoose');

const recipeReviewSchema = new mongoose.Schema({
    recipeId: {
        required: true,
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        required: true,
        type: String,
    },
    review: {
        type: String,
        default: "",
    },
    rating: {
        required: true,
        type: Number,
    },
    date: {
        required: true,
        type: Date,
    }
});

module.exports = mongoose.model('RecipeReview', recipeReviewSchema)