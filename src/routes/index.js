const mainRouter = require('express').Router();
const recipesRouter = require('./recipes.routes');
const usersRouter = require('./users.routes');


mainRouter.use('/recettes', recipesRouter);
mainRouter.use('/users', usersRouter);

module.exports = mainRouter;