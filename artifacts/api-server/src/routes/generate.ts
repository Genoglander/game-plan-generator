import OpenAI from "openai";
import { Router, type IRouter } from "express";
import { GenerateGamePlanBody } from "@workspace/api-zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  zh: "Generate ALL text content in Simplified Chinese (简体中文). This includes the title, genre, concept, coreLoop, targetAudience, features, task titles, task descriptions, challenge titles, challenge descriptions, solutions, day labels, task items, and milestones. Only keep technical terms (like programming language names) in English.",
  ja: "Generate ALL text content in Japanese (日本語). This includes the title, genre, concept, coreLoop, targetAudience, features, task titles, task descriptions, challenge titles, challenge descriptions, solutions, day labels, task items, and milestones. Only keep technical terms (like programming language names) in English.",
  en: "Generate ALL text content in English.",
};

const router: IRouter = Router();

router.post("/generate", async (req, res) => {
  const parsed = GenerateGamePlanBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { idea, language = "zh" } = parsed.data;
  const langInstruction = LANGUAGE_INSTRUCTIONS[language] ?? LANGUAGE_INSTRUCTIONS.zh;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional game design AI assistant.

${langInstruction}

Given a game idea, generate a complete game plan as a JSON object with EXACTLY this structure (use camelCase for all keys):

{
  "designDoc": {
    "title": "string — game title",
    "genre": "string — genre",
    "concept": "string — one paragraph describing the game",
    "coreLoop": "string — core gameplay loop description",
    "targetAudience": "string — who is this game for",
    "platforms": ["string"],
    "features": ["string — key feature"]
  },
  "taskList": [
    {
      "id": number,
      "category": "string — one of: programming, design, art, audio, qa",
      "title": "string",
      "description": "string or null",
      "priority": "high | medium | low",
      "estimatedHours": number
    }
  ],
  "technicalChallenges": [
    {
      "title": "string",
      "difficulty": "hard | medium | easy",
      "description": "string — what the challenge is",
      "solution": "string — how to solve it"
    }
  ],
  "weeklyPlan": [
    {
      "day": number,
      "label": "string — e.g. Day 1 — Foundation",
      "tasks": ["string"],
      "milestone": "string — what is achieved by end of this day"
    }
  ]
}

Rules:
- Return ONLY the JSON object, no markdown, no explanation.
- weeklyPlan must have exactly 7 entries (day 1–7).
- taskList should have 6–10 tasks.
- technicalChallenges should have 3–5 entries.
- All keys must be camelCase exactly as shown above.
- priority values must be exactly: high, medium, or low (lowercase English).
- difficulty values must be exactly: hard, medium, or easy (lowercase English).
- category values must be exactly one of: programming, design, art, audio, qa (lowercase English).`,
        },
        {
          role: "user",
          content: `Game idea: ${idea}`,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const gamePlan = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    res.json(gamePlan);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate game plan" });
  }
});

export default router;
