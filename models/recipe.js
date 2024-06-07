const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	instructions: String,
	owner: { type: mongoose.Schema.Types.ObjectId, require: true },
	ingredients: [mongoose.Schema.Types.ObjectId],
});

const Ingredient = mongoose.model('Ingredient', recipeSchema);

module.exports = Ingredient;
