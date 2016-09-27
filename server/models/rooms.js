var mongoose = require('mongoose');

module.exports = mongoose.model('Room', {
    name: String,
    creator: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    messages: [{ id: String, creator: String, body: String }]
})
