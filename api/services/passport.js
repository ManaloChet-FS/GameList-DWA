const passport = require('passport');
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local");

const User = require("../models/user");

const localOptions = {
  usernameField: 'email'
}

const localStrategy = new LocalStrategy(localOptions, async function (email, password, done) {
  try {
    const user = await User.findOne({ email });
    if (!user) done(null, false);
    user.comparePassword(password, function (error, isMatch) {
      if (error) return done(error)
      if (!isMatch) return done(null, false)
      return done(null, user);
    })
  } catch (error) {
    done(error)
  }
})

const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

const jwtStrategy = new JwtStrategy(jwtOptions, async function (payload, done) {
  try {
    const user = await User.findById(payload.sub);
    user ? done(null, user) : done(null, false);
  } catch (error) {
    done(error, false);
  }
})

passport.use(localStrategy);
passport.use(jwtStrategy);