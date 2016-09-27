angular.module('chatApp').controller('HomeController', ['$scope', '$state', '$http', 'HomeService', function($scope, $state, $http, HomeService){

    $scope.loggedInUser = JSON.parse(localStorage.getItem('User-Data'));

    // Get All Users
    $http.get('api/users/recent').then(function(response) {
        $scope.allUsers = response.data;
    });

}])
