const express = require("express");
const mainRouter = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    origin: process.env.CLIENT_ORIGIN,
    allowedHeaders: "Content-type, Authorization, X-Requested-With, Accept, xsrf-token",
  }),
);
app.use(cookieParser());
app.use("/images", express.static("./images"));
app.get("/", (req, res) => {
  res.status(200).json({ foo: "hello" });
});

app.use("api/", mainRouter);

module.exports = app;