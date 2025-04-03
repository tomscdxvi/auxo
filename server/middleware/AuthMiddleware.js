const Coach = require("../models/Coach");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

/*
module.exports.checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.json({ status: false });
        }

        jwt.verify(token, process.env.JWT_TOKEN, async (error, decodedToken) => {
            if (error) {
                console.error("JWT verification failed:", error.message); // Log the error for debugging
                return res.json({ status: false });
            }

            try {
                const user = await User.findById(decodedToken.id);

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
*/

module.exports.checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            req.user = null; // Attach null if no token
            return next(); // Move to the next middleware/route
        }

        jwt.verify(token, process.env.JWT_TOKEN, async (error, decodedToken) => {
            if (error) {
                console.error("JWT verification failed:", error.message);
                req.user = null; // Attach null if verification fails
                return next(); // Move to the next middleware/route
            }

            try {
                const user = await User.findById(decodedToken.id);
                if (user) {
                    req.user = user; // Attach user data to req
                } else {
                    req.user = null;
                }
                next(); // Move to the next middleware/route
            } catch (dbError) {
                console.error("Database query failed:", dbError.message);
                req.user = null;
                next(); // Move to the next middleware/route
            }
        });
    } catch (globalError) {
        console.error("Unexpected error:", globalError.message);
        req.user = null;
        next();
    }
};


