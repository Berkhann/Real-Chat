const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//models
const User = require('../models/user');

passport.use(
    new GoogleStrategy({
    clientID:process.env.GOOGLE_LOGIN_CLIENT_ID,
    clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
    callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
},((accessToken,refreshToken,profile,done)=>{
    const data = profile._json;

    User.findOrCreate({
        'googleId':data.id
    },{
        name:data.given_name,
        surname:data.family_name,
        profilePhotoUrl:data.picture + '0'
    },(err,user)=>{
        return done(err,user);
    });

    })
));

passport.serializeUser((user,done)=>{
    done(null,user);//gelen userin sessiona atanması
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

module.exports = passport;