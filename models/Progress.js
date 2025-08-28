import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ["skin", "hair", "mood", "menopause", "stress", "other"], default: "other" },
  notes: { type: String },
  energy: { type: Number, min: 0, max: 10 },
  mood: { type: Number, min: 0, max: 10 },
  sleepHours: { type: Number, min: 0, max: 24 }
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model("Progress", ProgressSchema);
