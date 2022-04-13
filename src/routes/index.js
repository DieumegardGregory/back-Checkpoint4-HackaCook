const mainRouter = require('express').Router();
const recipesRouter = require('./recipes.routes');
const usersRouter = require('./users.routes');
const authRouter = require('./auth.routes');


mainRouter.use('/recettes', recipesRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/auth', authRouter);

module.exports = mainRouter;