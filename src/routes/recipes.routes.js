
const recipesRouter = require('express').Router();
const { recipesControllers, multerControllers, authControllers } = require('../controllers');

recipesRouter.get('/', recipesControllers.findManyRecipes);
recipesRouter.get('/favorites/:id', recipesControllers.getAllFavorites);
recipesRouter.get('/:id', recipesControllers.findOneRecipeById);
recipesRouter.post('/', multerControllers.postImageObj, recipesControllers.createOneRecipe, recipesControllers.findOneRecipeById);
recipesRouter.put('/:id', recipesControllers.updateOneRecipe , recipesControllers.findOneRecipeById);
recipesRouter.delete('/:id', recipesControllers.deleteOneRecipe);
recipesRouter.post('/favorites', authControllers.verifyToken, recipesControllers.makeOneFavorite);
recipesRouter.delete('/favorites/:userId/:recipeId', authControllers.verifyToken, recipesControllers.stopOneFavorite);

module.exports = recipesRouter;


