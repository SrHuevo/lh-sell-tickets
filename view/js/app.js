var sellTickets = angular.module('SellTickets', ['ngRoute']);

sellTickets.config(function($routeProvider) {
    var loginResolve = {
        authorize: ['$location', function($location) {
            if(getCookie('Authorization') === undefined){
                $location.path('/login');
            } else {

            }
        }]
    };

    $routeProvider
    .when('/register', {
        templateUrl : 'template/register.html',
        controller : 'RegisterController',
        resolve : loginResolve
    })
    .when('/login', {
        templateUrl : 'template/login.html',
        controller : 'LoginController'
    })
    .when('/list', {
        templateUrl : 'template/list.html',
        controller : 'ListController',
        resolve : loginResolve
    })
    .when('/ticket', {
        templateUrl : 'template/ticket.html',
        controller : 'TicketController',
        resolve : loginResolve
    })
    .otherwise({
        redirectTo: '/ticket',
    });
});
