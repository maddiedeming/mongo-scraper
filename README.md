# [sequelize-burger]()
## Overview
In this assignment, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.
## Dependencies
* body-parser
* cheerio
* express
* express-handlebars
* mongoose
* morgan
* request
## Installation
### Install Locally
```
git clone https://github.com/maddiedeming/mongo-scraper.git
cd mongo-scraper/
npm install
```
### Command
`node server.js`
## Requirements
### Create an app that accomplishes the following:
- [x] Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. 
- [x] At a minimum, the app should scrape and display the following information for each article:
  - [x] Headline - the title of the article
  - [x] Summary - a short summary of the article
  - [x] URL - the url to the original article
  - [x] Feel free to add more content to your database (photos, bylines, and so on).
- [ ] Users should also be able to leave comments on the articles displayed and revisit them later:
  - [x] The comments should be saved to the database as well and associated with their articles
  - [x] Users should also be able to delete comments left on articles
  - [ ] All stored comments should be visible to every user
### Additional:
- [ ] Whenever you scrape a site for stories, make sure an article isn't already represented in your database before saving it; we don't want duplicates.
- [ ] Don't just clear out your database and populate it with scraped articles whenever a user accesses your site.
- [ ] If your app deletes stories every time someone visits, your users won't be able to see any comments except the ones that they post.
