import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import sequelize from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authenticate from "./middleware/authenticate.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", userRoutes);

app.get("/protected-route", authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.email}` });
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized!");
  })
  .catch((err) => {
    console.error("Error synchronizing database: ", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
