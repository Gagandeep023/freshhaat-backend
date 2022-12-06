const passport = require('passport');

const CHECK_FOR_AUTHENTICATION = passport.authenticate('jwt', { session: false });

module.exports = CHECK_FOR_AUTHENTICATION;