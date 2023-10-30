const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeId: {
        required: true,
        type: String,
    },
    label: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String,
    },
    ingredientLines: {
        required: true,
        type: Array,
    },
    source: {
        required: true,
        type: String,
    },
    totalCO2Emissions: {
        required: true,
        type: Number,
    },
    totalNutrients: {
        required: true,
        type: Array,
    },
    yield: {
        required: true,
        type: Number,
    },
    url: {
        required: true,
        type: String,
    },
    overallRating: {
        type: Number,
        default: 0,
    },
    numRating: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Recipe', recipeSchema)