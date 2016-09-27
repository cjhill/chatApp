angular.module('chatApp', ['ui.router'])

// Routing
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html'
    })
    .state('signup', {
        url: '/signup',
        controller: 'AuthController',
        templateUrl: 'app/auth/signup.html'
    })
    .state('profile', {
        url: '/profile',
        controller: 'ProfileController',
        templateUrl: 'app/profile/profile.html'
    })
    .state('rooms', {
        url: '/rooms',
        controller: 'RoomController',
        templateUrl: 'app/room/rooms.html'
    })
    .state('chat', {
        url: '/chat/:id',
        controller: 'ChatController',
        templateUrl: 'app/room/chat.html',
        resolve: {
            messages: function($http, $stateParams) {
                var config = {
                    params: { roomId: $stateParams.id }
                };

                return $http.get('api/rooms/getMessages', config).then(function(response) {
                    return response.data[0].messages;
                });
            }
        }
    });

    $urlRouterProvider.otherwise('/home');
}]);
