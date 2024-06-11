const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
    try {
		// const currentUser = await User.findById(req.session.user._id);
		const userRecipes = await Recipe.find({ owner: req.session.user._id });
		res.render('recipes/index.ejs', { recipes: userRecipes });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

router.get('/new', (req, res) => {
	res.render('recipes/new.ejs');
});

router.get('/:recipeId', async (req, res) => {
	try {
		const currentRecipe = await Recipe.findById(req.params.recipeId);
		res.render('recipes/show.ejs', { recipe: currentRecipe });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

router.get('/:recipeId/edit', async (req, res) => {
	try {
		const currentRecipe = await Recipe.findById(req.params.recipeId);
		res.render('recipes/edit.ejs', { recipe: currentRecipe });
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

router.post('/create', async (req, res) => {
	try {
		const newRecipe = new Recipe(req.body);
		newRecipe.owner = req.session.user._id;
		await newRecipe.save();
		res.redirect(`/ingredients/new/${newRecipe._id}`);
	} catch (err) {
		console.log(err);
		res.redirect('/new');
	}
});

router.put('/:recipeId', async (req, res) => {
	try {
		const currentRecipe = await Recipe.findById(req.params.recipeId);
		currentRecipe.set(req.body);
		await currentRecipe.save();
		res.redirect('/');
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

router.delete('/:recipeId', async (req, res) => {
	try {
		const currentRecipe = await Recipe.findById(req.params.recipeId);
		await currentRecipe.deleteOne();
		res.redirect('/recipes');
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

// if (recipe.owner.equals(req.session.user._id)) {
//     Proceed with edit or delete operation
//   } else {
//     Redirect or show an error message
//   }

module.exports = router;
