import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    console.log("mongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to mongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
