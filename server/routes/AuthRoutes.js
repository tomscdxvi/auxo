const router = require("express").Router();
const { login, register, getUserWorkoutHistory, track, deleteWorkout, registerCoach, getUserDetails } = require("../controllers/AuthControllers");
const { buildWorkout } = require("../controllers/GroqController");
const { checkUser } = require("../middleware/AuthMiddleware");

router.post("/");
router.post("/register", register);
router.post("/registerCoach", registerCoach);
router.post("/login", login);
router.post("/home", checkUser);
// router.post("/coach", checkCoach);
router.post("/track", checkUser);
router.post("/plan", checkUser);
router.post("/calculate", checkUser);
router.post("/user/:_id/track", track);
router.post("/chatbot/build-workout", buildWorkout);

router.delete("/workout/delete/:workoutId", deleteWorkout);

router.get("/user/:_id", getUserDetails);
router.get("/user/workouts/:_id", getUserWorkoutHistory);

module.exports = router;


