/* eslint no-console: 0 */
require("dotenv").config();
const express = require("express");
const mainRouter = require("./src/routes");

const app = express();
app.use(express.json());

app.use("/api/", mainRouter);
app.get("/", (req, res) => {
  res.status(200).json({ foo: "hello" });
});

const port = process.env.PORT || 5000;

const server = app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});

module.exports = server;


