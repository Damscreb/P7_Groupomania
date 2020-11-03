const rateLimit = require('express-rate-limit');

module.exports = (req, res, next) => {
    // Possibilité de faire 50 tentatives de connexion par 12h
    const apiLimiter = rateLimit({
        windowMs: 12 * 60 * 60 * 1000, // 12 heures en millisecondes
        max: 50,
        message: "You have exceeded the 50 attemps in 12hours!"
    });
    next();
}