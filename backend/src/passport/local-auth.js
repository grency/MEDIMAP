const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use('local', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {
    const user = await User.findOne({correo})
    if (!user) {
        return done(null, false);
    }
    if (user.password != password)
    {
        return done(null, false);
    }
    done(null, user);
    
}));

  
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
   //const user = User.findById(id);
   //done(null,user);
   User.findById(id, (err, user) => {
     done(err, user);
    });
});

