const authRouter = require("express").Router();
const { authControllers, usersControllers } = require("../controllers");

authRouter.get("/", authControllers.verifyToken, usersControllers.findOneUserById)
authRouter.post("/login", usersControllers.verifyCredentials, authControllers.createToken);
authRouter.post("/refreshToken", authControllers.verifyToken, authControllers.refreshToken);

module.exports = authRouter;