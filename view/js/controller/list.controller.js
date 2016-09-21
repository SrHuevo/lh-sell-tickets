sellTickets.controller('ListController', function($scope, $location, LoginService, ListService){
    $scope.tickets = [];

    ListService.getTickets().then(
        function(response){
            $scope.tickets = response.data;
            $scope.tickets.forEach(function(e,i){
                var d = new Date();
                $scope.tickets[i].sellDate = d.getFullYear()+'/'+d.getMonth()+'/'+d.getDay()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
            });
        }, function() {
            LoginService.logout();
        }
    );

    $scope.edit = function(ticket){
        $location.path('/ticket');
        $location.search('ticket', ticket._id);
    }
});
