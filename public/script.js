const socket = io();

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to add a message to the chat window
function addMessage(message, isSelf = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (isSelf) messageElement.classList.add('self');
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message);
        addMessage(message, true); // Add to UI as self message
        messageInput.value = ''; // Clear input
    }
});

// Receive message
socket.on('chat message', (data) => {
    addMessage(data.message); // Add to UI as received message
});