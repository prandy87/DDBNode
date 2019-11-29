const express = require("express");
const morgan = require("morgan");
const app = express();
//const mysql = require("mysql");

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static("./public"));
app.use(morgan("short"));

app.get("/", (req, res) => {
  console.log("responing to root route");
  res.end("HELLO FROM ROOOOOT");
});

const router = require("./routes/user.js");

app.use(router);

app.listen(3003, () => {
  console.log("success!");
});
