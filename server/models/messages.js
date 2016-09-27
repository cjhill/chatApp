var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    body: String,
    createdOn: Date,
    creator: String
})
