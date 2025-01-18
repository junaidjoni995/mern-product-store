import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  //app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.use(cors({ origin: "https://your-frontend-url.vercel.app" }));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
  connectDB();
});
