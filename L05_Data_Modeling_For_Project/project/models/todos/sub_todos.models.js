const mongoose = require("mongoose");

const subTodo = new mongoose.Schema(
    {
        content: {
            type: String,
            require: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("SubTodo", subTodo);

export default User;
