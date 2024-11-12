import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log("Data is connected successfully!");
    // console.log("Connection Instance : ", connectionInstance);
  } catch (error) {
    console.log("Error Found: ", error);
    process.exit(1);
  }
};

export default connnectDB;
