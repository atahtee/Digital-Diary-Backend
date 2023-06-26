import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from './routes/MyPosts.js';
import userRoutes from './routes/users.js';
import cors from 'cors'

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);



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

