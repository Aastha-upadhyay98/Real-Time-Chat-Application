const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

// CORS setup taaki frontend (client) connect kar sake
app.use(cors()); 

const server = http.createServer(app); // Server initialize

// Socket.IO ko server ke saath integrate karein
const io = new Server(server, {
    cors: {
        origin: "*", // Sabhi origins allow karne ke liye (development ke liye)
        methods: ["GET", "POST"]
    }
});

// Connection event listen karein
io.on('connection', (socket) => {
    console.log('A user connected'); // Confirmation message

    // Custom 'chat message' event ko listen karein
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        
        // Sabhi connected clients ko message broadcast karein
        io.emit('chat message', msg); 
    });

    // Disconnect event handle karein
    socket.on('disconnect', () => {
        console.log('A user leaves the chat'); 
    });
});

// Server ko port 5000 par run karein
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});