const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: true,
            min: [3, "Minimum password should be 3 character"],
            max: [15, "Maximum password should be of 15 character"],
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
