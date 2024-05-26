const Coach = require("../models/Coach");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_TOKEN, async (error, decodedToken) => {
            if(error) {
                res.json({ status: false });
                next();
            } else {
                const user = await User.findById(decodedToken._id);

                if(user) res.json({ status: true, user: user.username });
                else res.json({ status: false });
                
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
}

module.exports.checkCoach = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_TOKEN, async (error, decodedToken) => {
            if(error) {
                res.json({ status: false });
                next();
            } else {
                const coach = await Coach.findById(decodedToken._id);

                if(coach) res.json({ status: true, coach: coach.username });
                else res.json({ status: false });
                
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
}

