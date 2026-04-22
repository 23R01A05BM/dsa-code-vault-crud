import express from "express";
import Code from "../models/Code.js";

const router = express.Router();

// ✅ GET all codes
router.get("/", async (req, res) => {
  try {
    const codes = await Code.find().sort({ createdAt: -1 }); // latest first
    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST (Add new code)
// POST (Add new code)
router.post("/", async (req, res) => {
  const { title, language, category, difficulty, code } = req.body;

  if (!title || !language || !category || !difficulty || !code) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newCode = new Code({ title, language, category, difficulty, code });
    const savedCode = await newCode.save();
    res.status(201).json(savedCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ✅ PUT (Edit existing code)
router.put("/:id", async (req, res) => {
  const { title, language, category, difficulty, code } = req.body;

  try {
    const updatedCode = await Code.findByIdAndUpdate(
      req.params.id,
      { title, language, category, difficulty, code },
      { new: true }
    );

    if (!updatedCode) {
      return res.status(404).json({ message: "Code not found" });
    }

    res.json(updatedCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ✅ DELETE (Remove code)
router.delete("/:id", async (req, res) => {
  try {
    const deletedCode = await Code.findByIdAndDelete(req.params.id);

    if (!deletedCode) {
      return res.status(404).json({ message: "Code not found" });
    }

    res.json({ message: "Code deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
