import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import codeRoutes from "./routes/codeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS (allow your Vercel frontend)
app.use(
  cors({
    origin: ["https://dsacodes.vercel.app"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Health route (for UptimeRobot / keep-alive)
app.get("/health", (req, res) => {
  console.log("Health check hit:", new Date().toISOString());
  res.json({ status: "running" });
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/codes", codeRoutes);
app.use("/api/auth", authRoutes);

// ✅ Root route (optional but helpful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server (Render compatible)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);