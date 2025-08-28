import { dbConnect } from "../../lib/db";
import Progress from "../../models/Progress";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { email } = req.query;
      if (!email) return res.status(400).json({ error: "email required" });
      await dbConnect();
      const items = await Progress.find({ email }).sort({ createdAt: -1 }).limit(200);
      return res.status(200).json({ items });
    }

    if (req.method === "POST") {
      const { email, category, notes, energy, mood, sleepHours } = req.body || {};
      if (!email) return res.status(400).json({ error: "email required" });
      await dbConnect();
      const doc = await Progress.create({ email, category, notes, energy, mood, sleepHours, date: new Date() });
      return res.status(201).json({ ok: true, id: doc._id });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "DB error", details: e.message });
  }
}
