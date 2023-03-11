const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWT Strategy (in passports.js)

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); // Your local pssport file, checks is the user and pass exists then is creates a JWT below if it does

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // the username you're encoding in the JWT
        expiresIn: '7d', // Saying the token will expire in 7 days
        algorithm: 'HS256' // The algorithm used to "sign" or encode the values of the JWT
    });
}

/* POST LOGIN */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token }); // ES6 Shorthand version of returning the token
            });
        })(req, res);
    });
}