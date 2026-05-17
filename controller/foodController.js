import Food from "../model/foodModel.js";



// Create Food
export const createFood = async(req, res) => {

    try {

        const {
            foodName,
            category,
            quantity,
            purchaseDate,
            expiryDate
        } = req.body;

        if(
            !foodName ||
            !category ||
            !quantity ||
            !purchaseDate ||
            !expiryDate
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const foodData = new Food(req.body);

        const savedFood = await foodData.save();

        res.status(201).json(savedFood);

    } catch(error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

};




// Get All Foods
export const fetchFoods = async(req, res) => {

    try {

        const foods = await Food.find();

        res.status(200).json(foods);

    } catch(error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

};




// Update Food
export const updateFood = async(req, res) => {

    try {

        const id = req.params.id;

        const foodExist = await Food.findById(id);

        if(!foodExist) {
            return res.status(404).json({
                message: "Food item not found"
            });
        }

        const updatedFood = await Food.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );

        res.status(200).json(updatedFood);

    } catch(error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

};




// Delete Food
export const deleteFood = async(req, res) => {

    try {

        const id = req.params.id;

        const foodExist = await Food.findById(id);

        if(!foodExist) {
            return res.status(404).json({
                message: "Food item not found"
            });
        }

        await Food.findByIdAndDelete(id);

        res.status(200).json({
            message: "Food deleted successfully"
        });

    } catch(error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

};




// Get Expiring Foods
export const getExpiringFoods = async(req, res) => {

    try {

        const today = new Date();

        const nextThreeDays = new Date();

        nextThreeDays.setDate(today.getDate() + 3);

        const foods = await Food.find({

            expiryDate: {
                $gte: today,
                $lte: nextThreeDays
            }

        });

        res.status(200).json(foods);

    } catch(error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

};
