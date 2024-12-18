const express = require("express");
const bodyParser = require("body-parser");
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

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(() => {
    console.log("MongoDB Connection is Successful.")
})

try {
    app.listen(PORT, () => console.log(`Connected to Server at Port: ${PORT}`)); 
} catch(error) {
    console.log(`${error} failed to connect`);
}

app.use(
    cors({
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
        credentials: true
    })
);

app.use("/", authRoutes);

