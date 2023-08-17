require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const playerRouter = require('./tennis/player');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('Error connecting to MongoDB:', error));
db.once('open', () => console.log('Connected to MongoDB successfully!'));

app.use(express.json());
app.use(cors()); // Add () to use the cors middleware
app.use('/player', playerRouter);

app.listen(3004, () => console.log('Server started on port 3004'));
