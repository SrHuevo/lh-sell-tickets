sellTickets.controller('TicketController', function($scope, $location, LoginService, TicketService){
    $scope.ticket = {};
    inicializeTicket($location);
    $scope.submitForm = function(ticket){
        TicketService.newTicket(ticket).then(function(){
            $('#modalSend').modal('show');
            inicializeTicket();
        }, function(err) {
            alert(err);
        }
    )};

    $scope.new = function(){
        $location.search('ticket', undefined);
    };

    $scope.update = function(){
        TicketService.delete($scope.ticket._id).then(function(resp){
            var ticket = angular.copy($scope.ticket);
            delete(ticket._id);
            TicketService.newTicket(ticket).then(function(){
                $('#modalUpdate').modal('show');
                inicializeTicket();
            }, function(err) {
                alert(err);
            });
        }, function(err){
            alert(err);
        });
    }

    $scope.delete = function(){
        TicketService.delete($scope.ticket._id).then(function(resp){
            $('#modalDelete').modal('show');
            inicializeTicket();
        }, function(err){
            alert(err);
        });
    }

    $scope.reSend = function(){
        TicketService.reSend($scope.ticket._id).then(function(resp){
            $('#modalReSend').modal('show');
            inicializeTicket();
        }, function(err){
            alert(err);
        });
    }

    $scope.changeInmortal = function(){
        if($scope.ticket.inmortal === 0){
            $scope.ticket.inmortal = $scope.inmortal === 0 ? 1 : $scope.inmortal;
        } else {
            $scope.ticket.inmortal = 0;
        }
    }

    function inicializeTicket($location){
        if($location && $location.search() && $location.search().ticket){
            TicketService.getTicket($location.search().ticket).then(function(resp){
                $scope.ticket = resp.data[0];
            }, function(err){
                alert(err);
            });
        } else {
            $scope.ticket={name:'', mail:'', inmortal: 0};
        }
    }
});
