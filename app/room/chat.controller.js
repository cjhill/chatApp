angular.module('chatApp').controller('ChatController', ['$scope', '$state', '$stateParams', '$http', '$rootScope', 'messages', function($scope, $state, $stateParams, $http, $rootScope, messages){
    var socket = io.connect();

    $scope.loggedInUser = JSON.parse(localStorage.getItem('User-Data'));

    $scope.allMessages = messages;

    // Send Message
    $scope.sendMessage = function() {
        var request = {
            roomId: $stateParams.id,
            creator: $scope.loggedInUser[0].firstname + ' ' + $scope.loggedInUser[0].lastname,
            creatorId: $scope.loggedInUser[0]._id,
            body: $scope.message.body
        };

        // socket.emit('new-message', request);

        $http.post('api/rooms/send', request).then(function(response) {
            $scope.message.body = '';
        });
    };

}]);
