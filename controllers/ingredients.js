const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
	try {
		const allIngredients = await Ingredient.find();
		res.render('ingredients/index.ejs', { ingredients: allIngredients });
	} catch (err) {
		console.log(err);
		res.redirect('/ingredients');
	}
});

router.get('/new/:recipeId', async (req, res) => {
	try {
		const newRecipe = await Recipe.findById(req.params.recipeId);
		res.render('ingredients/new.ejs', { recipe: newRecipe });
	} catch (err) {
		console.log(err);
		res.redirect('/recipes');
	}
});

router.post('/new/:recipeId', async (req, res) => {
	try {
		const newIngredient = new Ingredient(req.body);
		await newIngredient.save();
		const newRecipe = await Recipe.findById(req.params.recipeId);
		newRecipe.ingredients.push(newIngredient);
		await newRecipe.save();
		res.redirect('/');
	} catch (err) {
		console.log(err);
		res.redirect('/ingredients');
	}
});

module.exports = router;
