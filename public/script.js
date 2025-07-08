const input = document.getElementById("userInput");
const chatBox = document.getElementById("chat-box");

// ✅ Send message and get bot reply
async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, "user");

  try {
    // Call backend
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // Add bot reply
    addMessage(data.reply, "bot");
  } catch (err) {
    console.error(err);
    addMessage("Oops! Something went wrong.", "bot");
  }

  // Clear input & refocus
  input.value = "";
  input.focus();
}

// ✅ Adds a chat bubble
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ✅ Send on Enter
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
