const express = require("express");

const router = express.Router();
const SubHeader = require("../model/subheader");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifytoken");
const { exists } = require("../model/subheader");
const { subHeaderValidation } = require("../validation");

//create a team
router.post("/addSubheader", async (req, res) => {
    //Let validate data before using
    const { error } = subHeaderValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const subHeader = new SubHeader({
      name: req.body.name,
      parent_id: req.body.parent_id,
      is_parent: req.body.is_parent
    });
  
    try {
      const savedSubheader = await subHeader.save();
      res.json(savedSubheader);
    } catch (error) {
      res.json({ message: error });
    }
  });


//get all news
router.get("/", verify, async (req, res) => {
    try {
        const savedSubHeader = await SubHeader.find();
        res.json(savedSubHeader);
    } catch (error) {
        res.json({ message: error });
    }
});

  //get indiviual news details
router.get("/:subHeaderId", async (req, res) => {
    try {
      const savedSubHeader = await SubHeader.findById(req.params.subHeaderId);
      res.json(savedSubHeader);
    } catch (error) {
      res.json({ message: error });
    }
  });

  //update news info
router.patch("/:subHeaderId", async (req, res) => {
    try {
      const savedSubHeader = await SubHeader.updateOne(
        { _id: req.params.subHeaderId },
        {
          $set: {
            title: req.body.title,
            title_image: req.body.title_image,
            body: req.body.body
          },
        }
      );
      res.json(savedSubHeader);
    } catch (error) {
      res.json({ message: error });
    }
  });

  //Delete indiviual news
router.delete("/:subHeaderId", async (req, res) => {
    try {
      const removedSubHeader = await SubHeader.remove({ _id: req.params.subHeaderId });
      res.json(removedSubHeader);
    } catch (error) {
      res.json({ message: error });
    }
  });

module.exports = router;