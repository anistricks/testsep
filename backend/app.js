var express = require("express");
var logger = require("morgan");


var propositionRouter = require("./routes/propositions");


var app = express();



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/propositions", propositionRouter);


module.exports = app;
