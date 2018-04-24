// Express Setup
const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Handlebars
const exphbs = require("express-handlebars");
app.engine('hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set('view engine', '.hbs');

// Database Setup
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
require("./controllers/controller.js")(app, ObjectId);

// Listener
const PORT = 8080;
app.listen(PORT, function(){
    console.log(`Running on: http://localhost:${PORT}/`);
});