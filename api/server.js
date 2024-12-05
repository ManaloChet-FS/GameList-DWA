const express = require("express");
require('dotenv').config();

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log("Database connection success!"));

const gameRouter = require("./routes/games");
app.use('/games', gameRouter);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
})