const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/AuthRoutes.js");

dotenv.config();

/* Connection to Server */
const app = express();
const PORT = process.env.PORT || 5001;

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(() => {
    console.log("MongoDB Connect is Successful.")
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

app.use(express.json());
app.use("/", authRoutes);

