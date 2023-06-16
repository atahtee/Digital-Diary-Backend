import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from './routes/MyPosts.js';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Listening to Port ${port}`));
  })
  .catch((err) => console.log(error));

