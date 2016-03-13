// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

// load up the user model
var User            = require('../models/user.model');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({usernameField: 'username',
                                                    passwordField: 'password',
                                                    passReqToCallback: true},
        function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
       // process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser  = new User();

                // set the user's local credentials
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

       // });

    }));
    
    passport.use('local-login', new LocalStrategy({usernameField: 'username',
                                                    passwordField: 'password',
                                                    passReqToCallback: true},
        function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
       // process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (!user) 
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            
            return done(null, user);
        });    

       // });

    }));
    
    // =========================================================================
    // TWITTER SIGNUP ============================================================
    // =========================================================================

    passport.use(new TwitterStrategy({

        consumerKey     : process.env.TWITTERconsumerKey,
        consumerSecret  : process.env.TWITTERconsumerSecret,
        callbackURL     : process.env.TWITTERcallbackURL

    },
    function(token, tokenSecret, profile, done) {

        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
    });
    }));
    

};
