import express from "express";

import {
    createUser,
    getUsers
} from "../controller/userController.js";

const route = express.Router();

route.post("/create", createUser);

route.get("/getallusers", getUsers);

export default route;