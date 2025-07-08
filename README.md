# Gemini-Chatbot


# 🤖 Gemini Chatbot

A simple yet powerful chatbot using **Google's Gemini API**, **Node.js**, **Express**, **MongoDB**, and a clean vanilla **HTML/CSS/JS** front end.

This project lets users chat with an AI assistant, stores all messages in MongoDB, and uses Google's Generative AI for smart replies.

---

## 📂 Project Structure

/project-root
├── public/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── models/
│ └── Message.js
├── .env
├── server.js
├── package.json



---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express, Mongoose
- **Frontend**: HTML, CSS, JavaScript
- **AI**: Google Gemini Generative AI
- **Database**: MongoDB

---

## 🚀 How It Works

1️⃣ User types a message in the chat UI.  
2️⃣ The message hits `/api/chat` on the server.  
3️⃣ The server saves the user message → calls Gemini → gets a reply → saves the bot reply → returns it to the frontend.  
4️⃣ The UI updates in real time!

---

## 🛠️ Setup & Run

**1. Clone the repo**
- git clone https://github.com/yourusername/gemini-chatbot.git
- cd gemini-chatbot

**2. Install dependencies**
- npm install

**3. Configure .env**
- Create a .env file and add:
- PORT=3000
- MONGO_URI=mongodb://localhost:27017/chatbotDB
- GEMINI_API_KEY=YOUR_GEMINI_API_KEY

**4. Run the server**
- npm start
- Your chatbot is now running at: http://localhost:3000 🚀

 ## 🌈 Features
- ✅ Real-time AI chat
- ✅ Messages saved to MongoDB
- ✅ Clean, minimalistic UI
- ✅ Gemini API integration

## 🧩 Folder Highlights
- public/ → Frontend files (HTML, CSS, JS)
- models/Message.js → Mongoose schema for storing chat history
- server.js → Express server setup, Gemini API call logic
- .env → Environment variables
