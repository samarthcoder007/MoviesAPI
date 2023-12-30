require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const movieRouter = require('./movie/movieRouter');

const server = http.createServer(app);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('Error connecting to MongoDB:', error));
db.once('open', () => console.log('Connected to MongoDB successfully!'));

app.use(express.json());
app.use(cors()); 
app.use('/movie',movieRouter);

server.listen(3004, () => console.log('Server started on port 3004'));
