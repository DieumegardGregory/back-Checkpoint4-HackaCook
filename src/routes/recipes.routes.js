
const recipesRouter = require('express').Router();
const { recipesControllers } = require('../controllers');
const { multerControllers } = require('../controllers');

recipesRouter.get('/', recipesControllers.findManyRecipes);
recipesRouter.get('/:id', recipesControllers.findOneRecipeById);
recipesRouter.post('/', multerControllers.postImageObj, recipesControllers.createOneRecipe, recipesControllers.findOneRecipeById);
recipesRouter.put('/:id', recipesControllers.updateOneRecipe , recipesControllers.findOneRecipeById);
recipesRouter.delete('/:id', recipesControllers.deleteOneRecipe);

module.exports = recipesRouter;


