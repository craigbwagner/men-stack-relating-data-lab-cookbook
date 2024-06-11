const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
	try {
		res.render('ingredients/index.ejs');
	} catch (err) {
		console.log(err);
		res.redirect('/ingredients');
	}
});

module.exports = router;
