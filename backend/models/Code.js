import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  category: { type: String, required: true },      // ✅ NEW
  difficulty: { type: String, required: true },    // ✅ NEW
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Code = mongoose.model("Code", codeSchema);

export default Code;
