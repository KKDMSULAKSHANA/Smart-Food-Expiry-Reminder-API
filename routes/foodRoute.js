import express from "express";

import {
    createFood,
    fetchFoods,
    updateFood,
    deleteFood,
    getExpiringFoods
} from "../controller/foodController.js";

const route = express.Router();

route.post("/createfood", createFood);

route.get("/getfoods", fetchFoods);

route.put("/updatefood/:id", updateFood);

route.delete("/deletefood/:id", deleteFood);

route.get("/expiring", getExpiringFoods);

export default route;