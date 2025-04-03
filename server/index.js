const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/AuthRoutes.js");
const { getUserDetails } = require("./controllers/AuthControllers.js");

dotenv.config();

/* Connection to Server */
const app = express();
// const PORT = process.env.PORT || 5001; // !! Disabled for now, fix later for MAC OS. Getting ERR_CONNECTION_REFUSED on MAC OS.
const PORT = 5000; // Delete later after fix ^

// Enable CORS for your frontend (running on localhost:3000)
app.use(cors({
    origin: "http://localhost:3000",  // Replace with the actual frontend URL in production
    credentials: true,               // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow only specific HTTP methods
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong" });
});

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connection is Successful.")
}).catch((err) => {
    console.error("MongoDB Connection Error:", err);
});

try {
    app.listen(PORT, () => console.log(`Connected to Server at Port: ${PORT}`)); 
} catch(error) {
    console.log(`${error} failed to connect`);
}

app.use("/", authRoutes);

