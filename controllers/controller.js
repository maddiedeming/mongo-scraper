// Global
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function(app, ObjectId){
    // GET: /
    app.get("/", function(req, res){
        db.Article.find({saved: false}).then(function(result){
            var hbsObject = { articles: result };
            res.render('index',hbsObject);
        }).catch(function(err){ res.json(err) });
    });
    // GET: /saved
    app.get("/saved", function(req, res){
        db.Article.aggregate([
            { $match: { saved: true } },
            { $lookup: {
                   from: "notes",
                   localField: "note",
                   foreignField: "_id",
                   as: "notes"
                }
            }
        ]).then(function(result,i){
                var hbsObject = { articles: result };
                res.render('index',hbsObject);
        }).catch(function(err){ res.json(err) });
    });
    // GET: /scrape
    app.get("/scrape", function (req, res){
        db.Article.remove({ saved: false }).then(function(removeArticles){
            axios.get("https://www.nytimes.com/").then(function(response){
                var $ = cheerio.load(response.data);
                $(".collection article h2").each(function (i, element){
                    var storyId = $(this).parent("article").attr("data-story-id");
                    var title = $(this).children("a").text();
                    var byline = $(this).siblings(".byline").text();
                    var link = $(this).children("a").attr("href");
                    var summary = $(this).siblings(".summary").text();
                    if(storyId && title && byline && link && summary){
                        var result = {};
                        result.storyId = storyId;
                        result.title = title;
                        result.byline = byline;
                        result.link = link;
                        result.summary = summary;
                        db.Article.create(result).then(function(results){
                            // console.log(results)
                            
                        }).catch(function(err){  });
                    }
                });
                res.redirect('/');
            }).catch(function(err){ res.json(err) });
        }).catch(function(err){ res.json(err) });
    });
    // POST: /savedArticles/:id
    app.post("/unsaveArticle/:id", function(req, res){
        db.Article.update({"_id": ObjectId(req.params.id)},{"$set":{"saved": false}}).then(function(results){
            res.json(results);
        }).catch(function(err){ res.json(err) });
    });
    // POST: /articles/:id
    app.post("/saveArticle/:id", function(req,res){
        db.Article.update({"_id": ObjectId(req.params.id)},{"$set":{"saved": true}}).then(function(results){
            res.json(results);
        }).catch(function(err){ res.json(err) });
    });
    // POST: /saveNote/:id
    app.post("/saveNote/:id", function(req, res){
        db.Note.create(req.body).then(function(dbNote){
            return db.Article.findOneAndUpdate({_id: req.params.id},{note: dbNote._id},{new: true});
        }).then(function(dbArticle){
            res.json(dbArticle);
        }).catch(function(err) { res.json(err) });
    });
    // POST: /deleteNote/:id
    app.post("/deleteNote/:id", function(req, res){
        db.Note.findOneAndRemove({_id: req.params.id}).then(function(results){
            res.json(results);
        }).catch(function(err) { res.json(err) });
    });
};