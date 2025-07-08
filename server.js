// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected!"))
//   .catch((err) => console.error(err));

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// app.post("/api/message", async (req, res) => {
//   try {
//     const userInput = req.body.message;

//     const result = await model.generateContent(userInput);
//     const response = result.response;
//     const text = response.text();

//     res.json({ reply: text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ reply: "Sorry, I can't answer that right now." });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Message from "./models/Message.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 👉 ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected!"))
.catch(err => console.error(err));

// ✅ Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// ✅ API route for chat
app.post("/api/chat", async (req, res) => {
  try {
    const userInput = req.body.message;

    // Save user message
    await Message.create({ sender: "user", text: userInput });

    // Call Gemini
    const result = await model.generateContent(userInput);
    const botReply = result.response.text();

    // Save bot reply
    await Message.create({ sender: "bot", text: botReply });

    res.json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, I can't answer that right now." });
  }
});

// ✅ Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
