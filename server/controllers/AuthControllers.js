const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const expiry = 3 * 24 * 60 * 60;

const generateToken = (id) => {
    return jwt.sign({id}, "tommy", {
        expiresIn: expiry
    });
}
 
module.exports.register = async(req, res, next) => {
    try {

        const {username, email, password} = req.body;

        const user = await User.create({
            username,
            email,
            password
        });

        const token = generateToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: expiry * 1000
        });

        res.status(201).json({
            user: user._id,
            created: true
        });

    } catch (error) {
        console.log(error);
        res.json({ error, created: false });
    }
};

module.exports.login = async(req, res, next) => {
    try {

        const {username, password} = req.body;

        const user = await User.login({
            username,
            password
        });

        const token = generateToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: expiry * 1000
        });

        res.status(201).json({
            user: user._id,
            created: true
        });

    } catch (error) {
        console.log(error);
        res.json({ error, created: false });
    }
};





