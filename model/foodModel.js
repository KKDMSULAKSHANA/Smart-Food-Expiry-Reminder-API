import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    foodName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    purchaseDate: {
        type: Date,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        default: "Fresh"
    }

});

export default mongoose.model("foods", foodSchema);
