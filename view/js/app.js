var sellTickets = angular.module('SellTickets', ['ngRoute']);

sellTickets.config(function($routeProvider) {
    $routeProvider
    .when('/register', {
        templateUrl : 'template/register.html',
        controller : 'RegisterController'
    })
    .when('/login', {
        templateUrl : 'template/login.html',
        controller : 'LoginController'
    })
    .when('/list', {
        templateUrl : 'template/list.html',
        controller : 'ListController'
    })
    .when('/ticket', {
        templateUrl : 'template/new-ticket.html',
        controller : 'NewTicketController'
    })
    .otherwise({
        redirectTo: "/login",
    });
});
