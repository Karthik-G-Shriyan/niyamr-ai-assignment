import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { extractPdfText } from "./pdfExtractor.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/check", upload.single("pdf"), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const rules = JSON.parse(req.body.rules);

    // 1) Extract text from PDF
    const pdfText = await extractPdfText(pdfBuffer);

    const results = [];

    for (const rule of rules) {
      // 2) Send text + rule to AI
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `
You are a document rule checker.

Document text: 
""" 
${pdfText}
"""

Rule: "${rule}"

Return EXACT JSON:
{
  "rule": "...",
  "status": "pass" | "fail",
  "evidence": "...",
  "reasoning": "...",
  "confidence": 0-100
}
`
            }
          ],
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = response.data.choices[0].message.content.trim();
      const parsedJson = JSON.parse(text);

      results.push(parsedJson);
    }

    return res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Processing error" });
  }
});

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
