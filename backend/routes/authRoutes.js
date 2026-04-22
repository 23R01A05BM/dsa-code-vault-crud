import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* 
// 🚨 ADMIN REGISTRATION IS NOW DISABLED FOR SECURITY
// ✅ This route was used only ONCE to create the first admin.
// ✅ DO NOT UNCOMMENT THIS AGAIN unless you want to re-enable admin creation.
router.post("/register-admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ email, password: hashedPassword, role: "admin" });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
*/

// ✅ Admin Login (returns JWT token)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// // ✅ CHANGE PASSWORD (Temporary - will disable after use)
// router.post("/change-password", async (req, res) => {
//   try {
//     const { email, oldPassword, newPassword } = req.body;

//     const admin = await User.findOne({ email });
//     if (!admin) return res.status(400).json({ message: "Admin not found" });

//     const isMatch = await bcrypt.compare(oldPassword, admin.password);
//     if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     admin.password = hashedPassword;
//     await admin.save();

//     res.json({ message: "Password updated successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


export default router;
