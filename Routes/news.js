const express = require("express");

const router = express.Router();
const News = require("../model/news");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifytoken");
const { exists } = require("../model/news");
const { newsValidation } = require("../validation");

//create a team
router.post("/addNews", async (req, res) => {
    //Let validate data before using
    const { error } = newsValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const news = new News({
      title: req.body.title,
      title_image: req.body.title_image,
      body: req.body.body
    });
  
    try {
      const savedNews = await news.save();
      res.json(savedNews);
    } catch (error) {
      res.json({ message: error });
    }
  });


//get all news
router.get("/", verify, async (req, res) => {
    try {
        const savedNews = await News.find();
        res.json(savedNews);
    } catch (error) {
        res.json({ message: error });
    }
});

  //get indiviual news details
router.get("/:newsId", async (req, res) => {
    try {
      const savedNews = await News.findById(req.params.newsId);
      res.json(savedNews);
    } catch (error) {
      res.json({ message: error });
    }
  });

  //update news info
router.patch("/:newsId", async (req, res) => {
    try {
      const updatedNews = await News.updateOne(
        { _id: req.params.newsId },
        {
          $set: {
            title: req.body.title,
            title_image: req.body.title_image,
            body: req.body.body
          },
        }
      );
      res.json(updatedNews);
    } catch (error) {
      res.json({ message: error });
    }
  });

  //Delete indiviual news
router.delete("/:newsId", async (req, res) => {
    try {
      const removedNews = await News.remove({ _id: req.params.newsId });
      res.json(removedNews);
    } catch (error) {
      res.json({ message: error });
    }
  });

module.exports = router;