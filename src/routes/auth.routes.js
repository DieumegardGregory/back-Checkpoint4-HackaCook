const authRouter = require("express").Router();
const { authControllers } = require("../controllers");

authRouter.post("/login", authControllers.createToken);

module.exports = authRouter;