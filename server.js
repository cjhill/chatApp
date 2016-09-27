var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/techSupportApp');

// Create express application
var app = express();

// Socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Mount Middleware
app.use(bodyParser.json());
app.use('/app', express.static(__dirname + '/app'));

// Controllers
var userController = require('./server/controllers/user.controller.js');
var roomController = require('./server/controllers/room.controller.js');

// API
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('new-message', function(msg) {
        io.emit('receive-message', msg);
    });

    // Disconnect
    socket.on('disconnect', function() {
        console.log('User has left');
    });
});

// Users
app.get('/api/users/get', userController.getUsers);
app.get('/api/users/recent', userController.getRecentUsers);
app.post('/api/users/post', userController.addUser);
app.post('/api/users/profile', userController.getUserProfile);

// Rooms
app.get('/api/rooms/get', roomController.getRooms);
app.get('/api/rooms/getMessages', roomController.getMessages);
app.post('/api/rooms/post', roomController.createRoom);
app.post('/api/rooms/send', roomController.sendMessage);




// Listen for connection
http.listen(3000, function() {
    console.log('Server Running');
});
