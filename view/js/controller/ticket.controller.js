sellTickets.controller('TicketController', function($scope, LoginService, TicketService){
    inicializeTicket();
    $scope.submitForm = function(){
        TicketService.newTicket($scope.ticket).then(
            function(){
                $('#modalSend').modal('show');
                inicializeTicket();
            }, function() {
                inicializeTicket();
                LoginService.logout();
            }
    )};

    function inicializeTicket(){
        $scope.ticket={name:'', mail:'', inmortal: false};
    }
});
