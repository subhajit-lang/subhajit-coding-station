const socket = io();

// Select DOM elements
const form = document.getElementById('chat-form');
const input = document.getElementById('msg-input');
const messages = document.getElementById('messages');

// Listen for chat messages from the server
socket.on('chat message', (msg) => {
  const li = document.createElement('li');

  // Check if the message is from the system or another user
  if (msg.sender === socket.id) {
    li.classList.add('sent');
  } else if (msg.sender === 'system') {
    li.classList.add('system'); // Optional for system messages
  } else {
    li.classList.add('received');
  }

  li.textContent = msg.text;
  messages.appendChild(li);
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = input.value;

  // Emit the message to the server
  socket.emit('chat message', { text: message, sender: socket.id });

  // Append the message locally with 'sent' class
  const li = document.createElement('li');
  li.classList.add('sent');
  li.textContent = message;
  messages.appendChild(li);

  input.value = '';
});