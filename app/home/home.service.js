angular.module('chatApp').service('HomeService', ['$http', function($http){

    this.test = 'test';

    this.getUsers = function() {
        return $http.get('api/users/recent').then(function(response) {
            return response.data;
        });
    };

}])
