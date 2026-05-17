import User from "../model/userModel.js";


// Create User
export const createUser = async(req, res) => {

    try {

        const userData = new User(req.body);

        const {email} = userData;

        const userExist = await User.findOne({email});

        if(userExist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const savedUser = await userData.save();

        res.status(201).json(savedUser);

    } catch(error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

};



// Get All Users
export const getUsers = async(req, res) => {

    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch(error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

};
