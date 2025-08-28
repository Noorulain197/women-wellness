import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }
  const { age, symptom } = req.body || {};
  if (!age || !symptom) return res.status(400).json({ error: "age and symptom are required" });

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const system = `You are an evidence-aware health explainer for adult women.
Output strictly in JSON with keys: summary (string), natural (string[]), modern (string[]),
comparison (array of {name, cost, timeframe, shortTerm, longTerm, sideEffects}),
cautions (string[]).
Keep tone neutral, educational. Avoid medical diagnosis. Include non-pharma options where possible.
If a treatment is controversial or lacks strong evidence, say so.`;

    const user = `Woman age ${age} reports: ${symptom}.
Return JSON only.`;

    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      temperature: 0.3
    });

    const raw = chat.choices?.[0]?.message?.content || "{}";
    let parsed;
    try { parsed = JSON.parse(raw); } catch { parsed = { summary: raw }; }

    // Basic guardrails
    if (!Array.isArray(parsed.cautions)) parsed.cautions = [];
    parsed.cautions.unshift("Educational only — not medical advice. Consult a qualified clinician before any treatment.");

    return res.status(200).json(parsed);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to analyze", details: e.message });
  }
}
