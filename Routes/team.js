const express = require("express");

const router = express.Router();
const Team = require("../model/team");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifytoken");
const { exists } = require("../model/team");
const { teamValidation } = require("../validation");

//create a team
router.post("/addTeam", async (req, res) => {
    //Let validate data before using
    const { error } = teamValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    //check whether player exists
    const teamExist = await Team.findOne({ name: req.body.team_username });
    if (teamExist) return res.status(400).send("Player Already exists");
  
    //hashin password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);
  
    const team = new Team({
      name: req.body.name,
      team_username: req.body.team_username,
      password: hashedPassword
    });
  
    try {
      const savedTeam = await team.save();
      res.json(savedTeam);
    } catch (error) {
      res.json({ message: error });
    }
  });


//get all teams
router.get("/", verify, async (req, res) => {
    try {
        const savedTeams = await Team.find();
        res.json(savedTeams);
    } catch (error) {
        res.json({ message: error });
    }
});

  //get indiviual team details
router.get("/:teamId", async (req, res) => {
    try {
      const savedTeam = await Team.findById(req.params.teamId);
      res.json(savedTeam);
    } catch (error) {
      res.json({ message: error });
    }
  });

  //update team info
router.patch("/:teamId", async (req, res) => {
    try {
      const updatedTeam = await Team.updateOne(
        { _id: req.params.teamId },
        {
          $set: {
            name: req.body.name,
            team_username: req.body.team_username
          },
        }
      );
      res.json(updatedTeam);
    } catch (error) {
      res.json({ message: error });
    }
  });

  //Delete indiviual team
router.delete("/:teamId", async (req, res) => {
    try {
      const removedTeam = await Team.remove({ _id: req.params.teamId });
      res.json(removedTeam);
    } catch (error) {
      res.json({ message: error });
    }
  });
  
  module.exports = router;