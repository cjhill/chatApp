angular.module('chatApp').controller('AuthController', ['$scope', '$state', '$http', function($scope, $state, $http){

    $scope.loggedInUser = JSON.parse(localStorage.getItem('User-Data'));

    // Is Logged In
    if (localStorage['User-Data']) {
        $scope.loggedIn = true;
    } else {
        $scope.loggedIn = false;
    }

    // Login
    $scope.login = function() {
        var login = {
            email: $scope.login.email,
            password: $scope.login.password
        };

        $http.post('api/users/profile', login).then(function(response) {
            var user = response.data;

            if (user) {
                localStorage.setItem('User-Data', JSON.stringify(response.data));
                $state.go('profile');
            }
        });
    };

    // Logout
    $scope.logout = function() {
        localStorage.removeItem('User-Data');
        $state.go('home');
    };

    // Add User
    $scope.addUser = function() {
        var user = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            password: $scope.user.password
        };

        $http.post('api/users/post', user).then(function(response) {
            localStorage.setItem('User-Data', JSON.stringify(response.data));
            $state.go('home');
        });
    };

}])
