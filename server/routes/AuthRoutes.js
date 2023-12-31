const router = require("express").Router();
const { login, register, getUserDetails, track, deleteTrack } = require("../controllers/AuthControllers");
const { checkUser } = require("../middleware/AuthMiddleware");

router.post("/");
router.post("/register", register);
router.post("/login", login);
router.post("/home", checkUser);
router.post("/track", checkUser);
router.post("/plan", checkUser);
router.post("/calculate", checkUser);
router.post("/user/:_id/track", track);

router.delete('/delete/:_id', deleteTrack);
router.get("/user/:_id", getUserDetails);
    
module.exports = router;


