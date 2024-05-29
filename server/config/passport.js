const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret_key',
};

passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findByPk(jwtPayload.id, {
      attributes: { exclude: ['password'] } // Exclude password field
    });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
