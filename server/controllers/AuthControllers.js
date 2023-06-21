const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const AsyncStorage = require('@react-native-async-storage/async-storage');

const expiry = 3 * 24 * 60 * 60;

const generateToken = (id) => {
    return jwt.sign({id}, "tommy", {
        expiresIn: expiry
    });
}
 
const handleErrors = (error) => {

    let errors = { username: "", password: ""};

    if(error.message === "Incorrect Username") errors.username = "The username you input is not registered in our system, please try again.";

    if(error.message === "Incorrect Password") errors.password = "The password you input is incorrect, please try again.";

    if(error.code === 11000) {
        errors.username = "Username or email is taken, please choose another."
        
        return errors;
    }

    if(error.message.includes("User's validation failed.")) {
        Object.values(error.errors).forEach(({props}) => {
            errors[props.path] = props.message;
        });
    }

    return errors;
};

module.exports.register = async(req, res, next) => {
    try {

        const { username, email, password, level } = req.body;

        const user = await User.create({
            username,
            email,
            password,
            level
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
        
        const errors = handleErrors(error);

        res.json({ errors, created: false });
    }
};

module.exports.login = async(req, res, next) => {
    try {

        const { username, password } = req.body;

        const user = await User.login(username, password);

        // console.log(user);

        const token = generateToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: expiry * 1000
        });

        res.status(200).json(user._id);

    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};

module.exports.getUserDetails = async(req, res, next) => {

    //const user = await User.findById("64334e6a69c05b05b5d23c74");

    const userId = req.params._id

    const user = await User.findById(userId).populate("users").exec();

    try {
        if(user) {
            
            res.json(user);

            return user;
        }
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, found: false });
    }
}

module.exports.track = async(req, res, next) => {


    const userId = req.params._id

    const { 
        title, 
        date, 
        start_time, 
        end_time, 
        sets, 
        reps, 
        weight, 
        name, 
        body_part, 
        description, 
        level } = req.body;

    const user = await User.findByIdAndUpdate(
        userId, 
        { $push : { 
            history : {
                title,
                date,
                start_time,
                end_time
            }
        }}, 
        {new: true}
    ).exec();

    try {
        if(user) {
            
            res.json(user);

            return user;
        }
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, found: false });
    }
};




