import OpenAI from "openai";

const RISK_KEYWORDS = [
  "glutathione", "mercury", "hydroquinone", "steroid", "botox", "filler",
  "laser", "isotretinoin", "minoxidil", "hormone", "peel", "whitening",
  "injection", "bleach", "iv drip", "IV drip"
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const riskHint = RISK_KEYWORDS.some(k => name.toLowerCase().includes(k.toLowerCase())) ?
      "This item triggers risk keywords. Apply extra caution." : "No preset risk keywords matched.";

    const system = `You assess consumer treatments/products for adult women's wellness.
Return JSON with keys: verdict (string), sideEffects (string[]), notes (string).
Base on general safety considerations. Do NOT provide medical diagnosis.
If evidence is weak, clearly state that. Keep balanced but cautious.`;

    const user = `Treatment/Product: ${name}. Return JSON only.`;

    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      temperature: 0.2
    });

    const raw = chat.choices?.[0]?.message?.content || "{}";
    let parsed;
    try { parsed = JSON.parse(raw); } catch { parsed = { verdict: raw }; }

    parsed.notes = `${riskHint}
` + (parsed.notes || "");
    return res.status(200).json(parsed);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to scan", details: e.message });
  }
}
