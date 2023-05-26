import mongoose from "mongoose";
import app from "./app";

const port: number = 5000;
const dbUrl: string =
  "mongodb://fahim:fahimkhan@localhost:27017/customer-care-chat?authSource=admin";

const connectMongo = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Mongoose database connected!");
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect database", error);
  }
};
connectMongo();
