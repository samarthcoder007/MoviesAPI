const Movies = require('../movies.js');
const express = require('express');
const route = express.Router();

route.get('/', async (req,res) => {
    try{
    const movies = await Movies.find();
    res.status(200).json(movies);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

route.get('/:name',getMovieByName, (req,res) => {
  try{
  res.status(200).json(res.movie);
  }catch(err){
      res.status(500).json({message: err.message});
  }
})

route.post('/', async (req,res) => {
     const newMovie = new Movies({
        name: capitalize(req.body.name) ,
        yearOfRelease: req.body.yearOfRelease,
        genre: req.body.genre,
        leadMaleActor: req.body.leadMaleActor ,
        leadFemaleActor: req.body.leadFemaleActor
     });
     try{
         const movie = await Movies.create(newMovie);
         res.status(201).json(movie);
     }catch(err){ 
          res.status(400).json({message: err.message});
     }
})

route.patch('/:id', getMovieByName, async (req,res) => {
      if(req.movie.name != NULL){
        res.movie.name = req.movie.name;
      }
      if(req.movie.yearOfRelease != NULL){
        res.movie.yearOfRelease = req.movie.yearOfRelease;
      }
      if(req.movie.genre != NULL){
        res.movie.genre = req.movie.genre;
      }
      if(req.movie.leadMaleActor != NULL){
        res.movie.leadMaleActor = req.movie.leadMaleActor;
      }
      if(req.movie.leadFemaleActor != NULL){
        res.movie.leadFemaleActor = req.movie.leadFemaleActor;
      }
      try{
      const updatedMovie = await res.movie.save();
      res.status(201).json(updatedMovie);
      }catch(err){
        res.status(400).json({message: err.message});
      }
})

route.delete('/:name',getMovieByName, async (req,res) => {
    try{
      if (!res.movie) {
        return res.status(404).json({ message: 'Movies not found' });
      }
        await res.movie.deleteOne({name: res.movie.name});
        res.status(200).json({name: res.movie.name});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

async function getMovieByName(req,res,next){
  let movie;
  const movieName = capitalize(req.params.name);
  try {
      movie = await Movies.findOne({name: movieName});

  if (!movie) {
    return res.status(404).json({ message: 'Movies not found' });
  }
} catch (err) {
  res.status(500).json({ message: err.message });
}
  res.movie = movie;
  next();
}

function capitalize(movie) {
  const words = movie.split(' ');
  const capitalizedWords = words.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(' '); 
}

module.exports = route;
