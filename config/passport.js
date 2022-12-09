const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const { UserCredential } = require("../models");

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        
        if(jwt_payload.exp < Date.now()){
            return done(null, false);
        }
        // We will assign the `sub` property on the JWT to the database ID of user
        UserCredential.findOne({where:{id: jwt_payload.sub}}) 
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        })
        .catch((err) => {
            return done(err, false);
        })
        
    }));
}