const User = require('../models/User.js');
const Workout = require('../models/Workout.js')
const jwt = require('jsonwebtoken');
const AsyncStorage = require('@react-native-async-storage/async-storage');
const { default: mongoose } = require('mongoose');

const expiry = 3 * 24 * 60 * 60;

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {
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

module.exports.registerCoach = async(req, res, next) => {
    try {

        const { username, email, password } = req.body;

        const coach = await Coach.create({
            username,
            email,
            password
        });

        const token = generateToken(coach._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: expiry * 1000
        });

        res.status(201).json({
            coach: coach._id,
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
        
        if(username.includes("coach")){ // Login as a Coach
            const coach = await Coach.login(username, password);

            const coachToken = generateToken(coach._id);
    
            res.cookie("jwt", coachToken, {
                withCredentials: true,
                httpOnly: false,
                maxAge: expiry * 1000
            });
    
            res.status(200).json(coach._id);
        } else { // Login as a regular User
            const user = await User.login(username, password);
    
            // console.log(user);
    
            const userToken = generateToken(user._id);
    
            res.cookie("jwt", userToken, {
                withCredentials: true,
                httpOnly: false,
                maxAge: expiry * 1000
            });
    
            res.status(200).json(user._id); 
        }
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};

module.exports.getUserDetails = async(req, res, next) => {
    try {
        const user = await User.findById(req.params._id).populate('history'); // ✅ Fetch workouts
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user.history); // ✅ Send workouts instead of just IDs
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching workouts" });
    }
}

module.exports.track = async (req, res, next) => {
    const userId = req.params._id;

    try {
        const newWorkout = await Workout.create({
            userId,
            title: req.body.title,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            type: req.body.type,
            name: req.body.name,
            intensity: req.body.intensity,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight
        });

        // ✅ Now add the workout reference to the User's `history`
        await User.findByIdAndUpdate(userId, {
            $push: { history: newWorkout._id }
        });

        res.status(201).json({ message: "Workout added successfully", workout: newWorkout });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the workout" });
    }
};

module.exports.createWorkout = async(req, res, next) => {
    
    const userId = req.params._id

    const { 
        name,
        intensity,
        sets,
        reps,
        weight
    } = req.body;

    const track = await Track.create({
        name,
        intensity,
        sets,
        reps,
        weight,
        track: trackId
    });
    
    const user = await User.findByIdAndUpdate(
        userId, 
        { $push : { 
            "history.$": {
                title,
                date,
                start_time,
                end_time,
                type,
            },
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
}

module.exports.deleteWorkout = async (req, res, next) => {
    // Retrieve the token from the cookies
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        // Verify the token and extract the user's ID
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;

        // Find the user by their ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get the workout ID from the request parameters
        const workoutId = req.params.workoutId;

        // First, remove the workout from the user's history array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { history: workoutId } },  // Use the workoutId directly, not an object with _id field
            { new: true }
        ).exec();

        // Check if the workout was removed from the user's history
        if (!updatedUser) {
            return res.status(404).json({ error: "Workout not found in user's history" });
        }

        // Now delete the workout from the Workout collection (if it exists in a separate collection)
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

        if (!deletedWorkout) {
            return res.status(404).json({ error: "Workout not found in workout collection" });
        }

        // Respond with a success message
        res.status(200).json({ message: "Workout deleted successfully", user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while deleting the workout" });
    }
};






