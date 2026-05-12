import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js";
import foodRoute from "./routes/foodRoute.js";

const app = express();

app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(() => {

    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})
.catch((error) => {
    console.log(error);
});

app.use("/api/user", userRoute);
app.use("/api/food", foodRoute);