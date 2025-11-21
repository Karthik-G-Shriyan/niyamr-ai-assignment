📄 NIYAMR AI — Document Rule Checker

A full-stack app that lets users upload a PDF, enter custom rules, and uses AI to evaluate the document.
Frontend: React • Backend: Node.js + Express

🚀 Features
Upload PDF
Enter custom rules
Extract text from PDF
AI checks each rule using OpenAI

Returns:
Status (pass/fail)
Evidence
Reasoning
Confidence score

🗂 Project Structure
frontend/
  App.jsx
  App.css

backend/
  server.js
  pdfExtractor.js
  .env

⚙️ Backend Setup (Node + Express)
1. Navigate to backend folder
cd backend

2. Install dependencies
npm install

3. Create .env file

Inside /backend create:

OPENAI_API_KEY=your_api_key_here

4. Install required libs (if missing)
npm install express multer axios cors dotenv pdf-parse

5. Start backend
node server.js

Backend runs on:
http://localhost:5000

🧠 Backend API
POST /check
Request (multipart/form-data)

pdf → uploaded file

rules → JSON array of rules

Response (array of objects)
{
  "rule": "string",
  "status": "pass | fail",
  "evidence": "string",
  "reasoning": "string",
  "confidence": 0-100
}

🎨 Frontend Setup (React)
1. Go to frontend
cd frontend

2. Install dependencies
npm install

3. Start frontend

For CRA:

npm start


For Vite:

npm run dev

Frontend runs on:
http://localhost:3000

🖼 How It Works

Upload a PDF

Enter 3 (or more) rules

Frontend sends rules + PDF → backend

Backend extracts PDF text

Sends rule + text to OpenAI API

AI returns JSON result

Frontend displays a results table

📌 Notes

Requires a valid OpenAI API Key

Processing works only on text-based PDFs

CORS enabled for frontend communication

Uses "gpt-4o-mini" model

🧪 Try Test Rules

Example rules you can enter:

"Document should contain the word Agreement"

"Must include a date"

"Must mention company name"

🛠 Tech Stack

Frontend: React, Axios
Backend: Node.js, Express, Multer
AI: OpenAI GPT-4o-mini
