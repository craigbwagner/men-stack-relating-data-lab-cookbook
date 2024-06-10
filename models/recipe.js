const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	instructions: String,
	owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Profile' },
	ingredients: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
