var User = require('../models/users.js');

// Find all users
function allUsers(res) {
    User.find(function(err, users) {
        res.json(users);
    });
}

// Find Most Recent Users
function mostRecentUsers(res) {
    User.find({}).sort('-createdAt').limit(5).exec(function(err, users) {
        res.json(users);
    });
}

// Find User Info
function userInfo(req, res) {
    var email = req.body.email;

    User.find({email: email}, function(err, user) {
        res.json(user);
    });
}

// Add New User
module.exports.addUser = function(req, res) {
    var user = new User(req.body);

    user.save().then(function(user) {
        res.json(user);
    }, function(error) {
        res.json({status: 500});
    });
};

// Get Recent Users
module.exports.getRecentUsers = function(req, res) {
    mostRecentUsers(res);
};

// Get All Users
module.exports.getUsers = function(req, res) {
    allUsers(res);
};

// Get User Profile
module.exports.getUserProfile = function(req, res) {
    userInfo(req, res);
};
