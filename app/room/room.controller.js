angular.module('chatApp').controller('RoomController', ['$scope', '$state', '$stateParams', '$http', function($scope, $state, $stateParams, $http){

    $scope.loggedInUser = JSON.parse(localStorage.getItem('User-Data'));

    // All Rooms
    $http.get('api/rooms/get').then(function(response) {
        $scope.allRooms = response.data;
    });
}]);
