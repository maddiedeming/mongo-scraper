// Express Setup
const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Scraper Setup
const axios = require("axios");
const cheerio = require("cheerio");

// Database Setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongoScraper");
const db = require("./models");
const PORT = 8080;

// GET: /scrape
app.get("/scrape", function(req, res){
    axios.get("https://www.nytimes.com/").then(function(response){
        var $ = cheerio.load(response.data);
        $(".collection article h2").each(function(i, element){
            var result = {};
            result.title = $(this).children("a").text();
            result.byline = $(this).siblings(".byline").text();
            result.link = $(this).children("a").attr("href");
            result.summary = $(this).siblings(".summary").text();
            if(result.title && result.link && result.summary){
                db.Article.create(result).then(function(dbArticle){
                    return res.json(dbArticle);
                }).catch(function(err){});
            }
        })
        res.redirect("/");
    });
});

// GET: /articles
app.get("/articles", function(req, res){
    db.Article.find({}).then(function(result){
        res.json(result);
    }).catch(function(err){});
});

// GET: /savedArticles
app.get("/savedArticles", function(req, res){
    db.Article.find({"saved": true}).then(function(result){
        res.json(result);
    }).catch(function(err){});
});

// GET: /articles/:id
app.get("/articles/:id", function(req, res){
    // db.Article.find({}).then(function(result){
    //     res.json(result);
    // }).catch(function(err){});
});

// POST: /articles/:id
app.post("/articles/:id", function(req, res){
    db.Article.create(req.body).then(function(result) {
        return db.Article.findOneAndUpdate({}, { $push: { articles: Article._id } });
    }).catch(function(err){});
});

// Listener
app.listen(PORT, function(){
    console.log(`Running on: http://localhost:${PORT}/`);
});