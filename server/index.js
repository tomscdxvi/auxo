import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/config.js";

dotenv.config();

/* Connection to Server */
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

/* MongoDB Connection */
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Connected to Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} failed to connect`));
