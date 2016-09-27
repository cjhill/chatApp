var Room = require('../models/rooms.js');

var DBQueries = (function() {
    // Add Room
    function addRoom(req) {
        var room = new Room(req.body);

        room.save().then(function(room) {
            res.json(room);
        }, function(error) {
            res.json({status: 500});
        });
    }

    // Return All Rooms
    function findRooms(res) {
        Room.find(function(err, rooms) {
            res.json(rooms);
        });
    }

    // Add Message to Room
    function addMessage(req, res) {
        var roomId = req.body.roomId;
        var message = {
            creator: req.body.creator,
            creatorId: req.body.creatorId,
            body: req.body.body
        };

        Room.update({ _id: roomId }, { $push: { messages : message }}, function(error, raw) {
            if (error) {
                console.log('There was an error');
            } else {
                console.log('Message Sent');
            }

        });
    }

    function findRoomMessages(req, res) {
        var roomId = req.query.roomId;

        Room.find({ _id: roomId }, { _id: false, messages: true }, function(err, messages) {
            res.json(messages);
        });
    }

    return {
        addRoom: addRoom,
        findRooms: findRooms,
        addMessage: addMessage,
        findRoomMessages: findRoomMessages
    };
})();

// Exports
module.exports.createRoom = function(req, res) {
    DBQueries.addRoom(req, res);
};

module.exports.getRooms = function(req, res) {
    DBQueries.findRooms(res);
};

module.exports.sendMessage = function(req, res) {
    DBQueries.addMessage(req, res);
};

module.exports.getMessages = function(req, res) {
    DBQueries.findRoomMessages(req, res);
};
