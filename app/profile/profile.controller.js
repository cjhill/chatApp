angular.module('chatApp').controller('ProfileController', ['$scope', '$state', '$http', function($scope, $state, $http){

    $scope.loggedInUser = JSON.parse(localStorage.getItem('User-Data'));

    // Create Room
    $scope.createRoom = function() {
        var room = {
            name: $scope.room.name,
            creator: $scope.loggedInUser[0]._id
        }

        $http.post('api/rooms/post', room).then(function(response) {
            console.log(response.data);
        });
    };

}]);
