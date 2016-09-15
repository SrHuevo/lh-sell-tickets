sellTickets.controller('ListController', function($scope, LoginService, ListService){
    $scope.tickets = [];

    ListService.getTickets().then(
        function(response){
            $scope.tickets = response.data;
        }, function() {
            LoginService.logout();
        }
    );
});
