let jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        if (email === config.email && password === config.password) {
            let token = jwt.sign({ email: email },
                config.secret,
                {
                    expiresIn: '22222222222222h'
                }
            );
            res.json({
                success: true,
                message: 'Authentication successful!',
                access_token: token,
                expires_in: 3600 //2h
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
};

module.exports = {
    checkToken: checkToken,
    login: login
};

