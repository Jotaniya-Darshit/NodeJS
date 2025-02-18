const passport = require('passport');
const localSt = require('passport-local').Strategy;
const schema = require('../Model/Schema');

passport.use(
  'local',
  new localSt({ usernameField: 'email' }, async (email, password, done) => {
    let admin = await schema.findOne({ email: email });

    if (admin) {
      if (admin.password == password) {
        return done(null, admin);
      } else {
        return done(null, false);
      }
    } else {
      return done(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  let admin = await schema.findById(userId);
  done(null, admin);
});

passport.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/');
  }
};

module.exports = passport;
