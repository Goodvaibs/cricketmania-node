const express = require('express');

const router = express.Router();
const Player = require('../model/player');


//get all players
router.get('/', async (req, res) => {
    try {
        const savedPlayers = await Player.find();
        res.json(savedPlayers);
    } catch (error) {
        res.json({message:error})
    }
});

//get indiviual player details
router.get('/:playerId', async (req, res) => {
    try {
        const savedPlayer = await Player.findById(req.params.playerId);
        res.json(savedPlayer);
    } catch (error) {
        res.json({message:error})
    }
});

//create a player
router.post('/addPlayer', async (req, res) => {
   
    const player = new Player({
        name: req.body.name,
        is_batsman:req.body.is_batsman,
        is_bowler:req.body.is_bowler,
        is_allrounder:req.body.is_allrounder,
        is_wicketkeeper:req.body.is_wicketkeeper
    });

    try {
        const savedPlayer = await player.save();
        console.log(savedPlayer);
        res.json(savedPlayer);
    } catch (error) {
        console.log(error);
        res.json({message:error})
    }
});

//Delete indiviual player
router.delete('/:playerId', async (req, res) => {
    try {
        const removedPlayer = await Player.remove({_id:req.params.playerId});
        res.json(removedPlayer);
    } catch (error) {
        res.json({message:error})
    }
});

//update player info
router.patch('/:playerId', async (req, res) => {
    try {
        const updatedPlayer = await Player.updateOne(
            {_id:req.params.playerId}, 
            {$set:{
                name:req.body.name
            }});
        res.json(updatedPlayer);
    } catch (error) {
        res.json({message:error})
    }
});

module.exports = router;