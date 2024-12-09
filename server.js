const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Listen for new connections from clients
io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast message to others when a user joins
  socket.broadcast.emit('chat message', { text: 'A new user has joined the chat!', sender: 'system' });

  // Listen for chat messages and broadcast to others
  socket.on('chat message', (msg) => {
    // Broadcast to all clients except the sender
    socket.broadcast.emit('chat message', msg);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    socket.broadcast.emit('chat message', { text: 'A user has left the chat', sender: 'system' });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});