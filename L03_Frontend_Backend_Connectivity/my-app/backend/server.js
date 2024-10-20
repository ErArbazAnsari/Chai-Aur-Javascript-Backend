import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    return res.send("Hello, from server.");
});

app.get("/api/jokes", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.freeapi.app/api/v1/public/randomjokes"
        );
        if (!response.ok) {
            return res
                .status(404)
                .json({ msg: "Failed during fetching jokes" });
        } else {
            const data = await response.json();
            res.status(200).json(data.data);
        }
    } catch (error) {
        console.log("Error found during jokes fetching.");
    }
});

app.listen(PORT, (req, res) => {
    return console.log(`Server is successfully running on PORT:${PORT}`);
});
