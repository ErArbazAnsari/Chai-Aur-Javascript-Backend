import dotenv from "dotenv";
import express from "express";
import connnectDB from "./db/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("Hello from server 😂");
});

connnectDB().then(
  app.listen(PORT, () => {
    return console.log(`Server is running on PORT: ${PORT}`);
  }),
);
