const router = require("express").Router();
const { login, register, getUserWorkoutHistory, track, deleteWorkout, registerCoach, getUserDetails, logout } = require("../controllers/AuthControllers");
const { buildWorkout } = require("../controllers/GroqController");
const { checkUser } = require("../middleware/AuthMiddleware");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts
    message: "Too many login attempts. Try again later.",
});

router.post("/register", register);
router.post("/login", loginLimiter, login);

// Protected routes (User must be authenticated)
router.use(checkUser); // Apply middleware to all routes below

router.get("/home", (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}` });
});

router.delete("/workout/delete/:workoutId", deleteWorkout);

router.get("/user/data", getUserDetails);
router.get("/user/workouts/:_id", getUserWorkoutHistory);
router.post("/chatbot/build-workout", buildWorkout);

router.get("/logout", logout);

// router.post("/coach", checkCoach);
/*
router.post("/registerCoach", registerCoach);
router.post("/track", checkUser);
router.post("/plan", checkUser);
router.post("/calculate", checkUser);
router.post("/user/:_id/track", track);
*/

module.exports = router;


