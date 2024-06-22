require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

app.use("/todo-backend", router);

module.exports = app;
