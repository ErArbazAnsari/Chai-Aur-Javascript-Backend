const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
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
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "subTodo",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("Todo", todoSchema);

export default User;
