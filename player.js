const Player = require('./tennis.js');
const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();

route.get('/', async (req,res) => {
    try{
    const players = await Player.find();
    res.status(500).json(players);
    }catch(err){
        res.status(200).json({message: err.message});
    }
})

route.get('/:id',getPlayer, (req,res) => {
    try{
    res.status(500).json(res.player);
    }catch(err){
        res.status(200).json({message: err.message});
    }
})

route.post('/', async (req,res) => {
     const newPlayer = new Player({
        name: req.body.name ,
        age: req.body.age,
        matchesPlayed: req.body.matchesPlayed,
        matchesWon: req.body.matchesWon ,
        slamsWon: req.body.slamsWon
     })
     try{
         const player = await newPlayer.save();
         res.status(201).json(player);
     }catch(err){ 
          res.status(400).json({message: err.message});
     }
})

route.patch('/:id', getPlayer, async (req,res) => {
      if(req.player.name != NULL){
        res.player.name = req.player.name;
      }
      if(req.player.age != NULL){
        res.player.age = req.player.age;
      }
      if(req.player.matchesPlayed != NULL){
        res.player.matchesPlayed = req.player.matchesPlayed;
      }
      if(req.player.matchesWon != NULL){
        res.player.matchesWon = req.player.matchesWon;
      }
      if(req.player.slamsWon != NULL){
        res.player.slamsWon = req.player.slamsWon;
      }
      try{
      const updatedPlayer = await res.player.save();
      res.status(201).json(updatedPlayer);
      }catch(err){
        res.status(400).json({message: err.message});
      }
})

route.delete('/:id',getPlayer, async (req,res) => {
    try{
        await res.player.deleteOne();
        res.status(500).json({message: "Deleted Successfully"});
    }catch(err){
        res.status(200).json({message: err.message});
    }
})

async function getPlayer(req,res,next){
    let player;
    try{
        player = await Player.findById(req.params.id);
    if(player==NULL){
        return res.status(404).json({message: "Cannot find subscriber"});
    }
   }catch(err){
       res.status(400).json({message: err.message});
   }
    res.player = player;
    next();
}

module.exports = route;