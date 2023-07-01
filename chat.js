let lastSentTime = 0;
let name = null;
let isCooldownActive = false;

function addMessage() {
  const message = document.getElementById("message").value.trim();

  if (message && !isCooldownActive) {
    const messages = document.getElementById("messages");
    const messageContainer = document.createElement("div");
    const messageContent = document.createElement("div");
    const messageTime = document.createElement("div");
    const messageForm = document.querySelector(".message-form");

    messageContainer.classList.add("message");
    messageContent.classList.add("message-content");
    messageTime.classList.add("message-time");

    messageContent.textContent = name ? `${name}: ${message}` : message;
    messageTime.textContent = new Date().toLocaleTimeString();

    if (messageForm.classList.contains("message-left")) {
      messageContainer.appendChild(messageContent);
      messageContainer.appendChild(messageTime);
      messageContainer.classList.add("message-left");
    } else {
      messageContainer.appendChild(messageTime);
      messageContainer.appendChild(messageContent);
      messageContainer.classList.add("message-right");
    }

    messages.appendChild(messageContainer);
    messages.scrollTop = messages.scrollHeight;
    document.getElementById("message").value = "";

    const currentTime = new Date().getTime();
    if (currentTime - lastSentTime < 5000) {
      isCooldownActive = true;
      document.getElementById("send-btn").disabled = true;
      const popup = document.createElement("div");
      popup.classList.add("popup");
      popup.textContent = `Please wait for ${5 - Math.floor((currentTime - lastSentTime) / 1000)} seconds before sending another message.`;
      document.body.appendChild(popup);
      const countdown = setInterval(() => {
        const secondsLeft = 5 - Math.floor((new Date().getTime() - lastSentTime) / 1000);
        if (secondsLeft === 0) {
          clearInterval(countdown);
          isCooldownActive = false;
          document.getElementById("send-btn").disabled = false;
          document.body.removeChild(popup);
          document.getElementById("message").disabled = false;
        } else {
          popup.textContent = `Please wait for ${secondsLeft} seconds before sending another message.`;
        }
      }, 1000);
      document.getElementById("message").disabled = true;
    }
    lastSentTime = currentTime;
  }
}

function clearMessages() {
  const password = prompt("Please enter password to clear messages:");

  if (password === "321") {
    const messages = document.getElementById("messages");
    while (messages.firstChild) {
      messages.removeChild(messages.firstChild);
    }
  }
}

function setUserName() {
  const nameInput = document.getElementById("name-input");
  const nameValue = nameInput.value.trim();

  if (nameValue) {
    name = nameValue;
    document.getElementById("name-display").textContent = name;
    document.getElementById("name-box").style.display = "none";
    nameInput.value = "";
  }
}

document.getElementById("send-btn").addEventListener("click", () => {
  if (!name) {
    document.getElementById("name-box").style.display = "block";
  } else {
    addMessage();
  }
});

document.getElementById("name-form").addEventListener("submit", (event) => {
  event.preventDefault();
  setUserName();
});

document.querySelector(".message-form-image:first-child").addEventListener("click", () => {
  const messageForm = document.querySelector(".message-form");
  messageForm.classList.toggle("message-left");
  messageForm.classList.toggle("message-right");
});

document.querySelector(".message-form-image:last-child").addEventListener("click", clearMessages);

document.getElementById("message").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!name) {
      document.getElementById("name-box").style.display = "block";
    } else {
      addMessage();
    }
  }
});