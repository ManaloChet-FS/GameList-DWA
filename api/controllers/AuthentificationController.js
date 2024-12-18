const User = require("../models/user");
const jwt = require("jwt-simple");

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, process.env.SECRET)
}

exports.signin = (req, res, next) => {
  try {
    const user = req.user;
    res.send({ token: tokenForUser(user), user_id: user._id });
  } catch (error) {
    next(error);
  }
}

exports.signup = async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Email and password are required" })
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) { return res.status(422).json({ error: "Email already in use" }) }
    const user = await User.create({
      email,
      password
    })
    res.json({ user_id: user._id, token: tokenForUser(user) })
  } catch (error) {
    return res.status(400).json(error);
  }
}