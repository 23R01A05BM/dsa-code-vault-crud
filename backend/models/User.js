import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, default: "admin" } // Always admin (for now)
});

const User = mongoose.model("User", userSchema);

export default User;
