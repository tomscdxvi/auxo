const Coach = require("../models/Coach");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.json({ status: false });
        }

        jwt.verify(token, "tommy", async (error, decodedToken) => {
            if (error) {
                console.error("JWT verification failed:", error.message); // Log the error for debugging
                return res.json({ status: false });
            }

            try {
                const user = await User.findById(decodedToken._id);

                if (user) {
                    return res.json({ status: true, user: user.username });
                } else {
                    return res.json({ status: false });
                }
            } catch (dbError) {
                console.error("Database query failed:", dbError.message); // Log DB errors
                return res.status(500).json({ status: false, error: "Database error" });
            }
        });
    } catch (globalError) {
        console.error("Unexpected error:", globalError.message); // Log unexpected errors
        return res.status(500).json({ status: false, error: "Unexpected error" });
    }
};
