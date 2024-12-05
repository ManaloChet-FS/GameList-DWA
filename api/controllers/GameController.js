const GameModel = require("../models/games");

class NotFoundError extends Error {
  constructor() {
    super("Game not found!");
    this.name = "NotFoundError";
  }
}

exports.GetAllGames = async (req, res) => {
  try {
    const games = await GameModel.find({}, '-__v');
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({
      error: "An internal server error has occurred!"
    })
  }
}

exports.GetGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await GameModel.findById(id, '-__v');

    if (!game) {
      throw new NotFoundError;
    }

    res.status(200).json(game);
  } catch (err) {
    console.log(err);
    switch (err.name) {
      case "CastError":
        res.status(400).json({
          error: "Invalid game ID"
        });
        break;
      case "NotFoundError":
        res.status(404).json({
          error: err.message
        })
        break;
      default:
        res.status(500).json({
          error: "An internal server error has occurred!"
        })
    }
  }
}

exports.CreateGame = async (req, res) => {
  try {
    const { title, releaseDate, genre } = req.body;

    const newGame = {
      title,
      releaseDate,
      genre
    }

    const game = await GameModel.create(newGame);

    res.status(201).json(game);
  } catch (err) {
    console.log(err);
    switch (err.name) {
      case "ValidationError":
        res.status(400).json({
          error: "Invalid input!",
          invalidInputs: Object.keys(err.errors)
        })
        break;
      case "MongoServerError":
        res.status(400).json({
          error: "Game is already created!"
        })
        break;
      default:
        res.status(500).json({
          error: "An internal server error has occurred!",
          errorName: err.name
        })
    }
  }
}

exports.UpdateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, releaseDate, genre } = req.body;

    const updatedGame = {
      title,
      releaseDate,
      genre
    }

    const game = await GameModel.findByIdAndUpdate(id, updatedGame, { returnDocument: 'after', runValidators: true });

    if (!game) {
      throw new NotFoundError;
    }

    res.status(200).json(game);
  } catch (err) {
    console.log(err);
    switch (err.name) {
      case "CastError":
        res.status(400).json({
          error: "Invalid game ID"
        });
        break;
      case "NotFoundError":
        res.status(404).json({
          error: err.message
        });
        break;
      case "ValidationError":
        res.status(400).json({
          error: "Invalid input!",
          invalidInputs: Object.keys(err.errors)
        })
        break
      default:
        res.status(500).json({
          error: "An internal server error has occurred!"
        })
    }
  }
}

exports.DeleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await GameModel.findByIdAndDelete(id);

    if (!game) {
      throw new NotFoundError;
    }

    res.status(204).json();
  } catch (err) {
    switch (err.name) {
      case "CastError":
        res.status(400).json({
          error: "Invalid game ID"
        });
        break;
      case "NotFoundError":
        res.status(404).json({
          error: err.message
        })
        break;
      default:
        res.status(500).json({
          error: "An internal server error has occurred!"
        })
    }
  }
}