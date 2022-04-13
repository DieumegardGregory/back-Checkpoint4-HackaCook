const recipesControllers = require('./recipes.controllers');
const usersControllers = require('./users.controllers');
const multerControllers = require('./multer.controllers');
const authControllers = require('./auth.controllers');

module.exports = {
  recipesControllers,
  usersControllers,
  multerControllers,
  authControllers,
}