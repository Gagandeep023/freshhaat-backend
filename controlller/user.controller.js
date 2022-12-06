const { UserCredential } = require("../models");

const credentialUtils = require('../lib/credentialUtils');
const userController = {};

userController.login = async (req, res, next) => {

        UserCredential.findOne({where:{ username: req.body.username }})
           
        .then((user) => {
    
                if (!user) {
                    return res.status(401).json({ success: false, msg: "could not find user" });
                }
                
                const isValid = credentialUtils.validPassword(req.body.password, user.hash, user.salt);
                
                if (isValid) {
    
                    const tokenObject = credentialUtils.issueJWT(user);
    
                    res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
    
                } else {
    
                    res.status(401).json({ success: false, msg: "you entered the wrong password" });
    
                }
    
            })
            .catch((err) => {
                next(err);
            });

};

userController.register = async (req, res, next) => {

    UserCredential.findOne({where:{ username: req.body.username }})
    .then((user) => {
        if (user) {
            return res.status(401).json({ success: false, msg: "Username already taken" });
        }

        const saltHash = credentialUtils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new UserCredential({
            username: req.body.username,
            hash: hash,
            salt: salt
        });

        try {
        
            newUser.save()
                .then((user) => {
                    res.json({ success: true, user: user });
                });

        } catch (err) {
            
            res.json({ success: false, msg: err });
        
        }
    })
    .catch((err) => {
        next(err);
    });

};

module.exports = userController;