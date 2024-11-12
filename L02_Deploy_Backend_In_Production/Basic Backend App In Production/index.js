const express = require("express");
const app = express();
require("dotenv/config.js");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    return res.send("Welcome on our server...");
});

app.get("/:name", (req, res) => {
    const uname = req.params.name;
    return res.send(`<h1>Hello, ${uname}</h1>`);
});

app.get("/github/:username", async (req, res) => {
    try {
        const response = await fetch(`https://api.github.com/users/${req.params.username}`);
        if (!response.ok) {
            return res.status(response.status).json({ error: "User not found" });
        }
        const userInfo = await response.json();
        return res.json(userInfo);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    return console.log(`Server is running on PORT:${PORT}`);
});
