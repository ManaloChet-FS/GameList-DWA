const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log("Database connection success!"));

app.use(express.json());
app.use(cors());

const gameRouter = require("./routes/games");
app.use('/api/v1/games', gameRouter);

const authRouter = require("./routes/auth");
app.use('/api/v1/auth', authRouter);

app.use(express.static(path.join(__dirname, '../reactjs/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../reactjs/dist', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
})