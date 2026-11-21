
const input = document.getElementById("message");
const messages = document.getElementById("messages");
const historyBox = document.getElementById("history");

let chats = [];
let currentChat = [];

function renderMessages() {
  messages.innerHTML = "";

  currentChat.forEach(item => {
    const div = document.createElement("div");
    div.className = "message " + item.role;
    div.textContent = item.text;
    messages.appendChild(div);
  });

  messages.scrollTop = messages.scrollHeight;
}

function renderHistory() {
  historyBox.innerHTML = "";

  chats.forEach((chat, index) => {
    const button = document.createElement("button");
    button.className = "history-item";
    button.textContent = chat.title;
    button.onclick = () => {
      currentChat = chat.messages;
      renderMessages();
    };
    historyBox.appendChild(button);
  });
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  currentChat.push({
    role: "user",
    text: text
  });

  if (currentChat.length === 1) {
    chats.push({
      title: text.slice(0, 25),
      messages: currentChat
    });
    renderHistory();
  }

  renderMessages();
  input.value = "";
}

function newChat() {
  currentChat = [];
  renderMessages();
}

input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
