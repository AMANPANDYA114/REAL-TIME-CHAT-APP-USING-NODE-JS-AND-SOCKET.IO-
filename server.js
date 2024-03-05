
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("A user connected successfully");
    
    socket.on('message', (msg) => {
        console.log(msg);
        // Here you can broadcast the message to other clients if needed
        // socket.broadcast.emit('message', msg); // Broadcast to all other clients except the sender
        io.emit('message', msg); // Broadcast to all clients including the sender
    });
});