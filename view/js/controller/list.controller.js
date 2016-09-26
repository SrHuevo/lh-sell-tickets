sellTickets.controller('ListController', function($scope, $location, LoginService, ListService, TicketService){
    $scope.tickets = [];
    LoginService.login().then(function(response){
        $scope.user = response.data;
    },function(err){
        alert("Vuelve a ingresar, tenías las credenciales mal guardadas...")
        LoginService.logout();
    });
    ListService.getTickets().then(function(response){
        $scope.tickets = response.data;
        $scope.tickets.forEach(function(e,i){
            var d = new Date(e.sellDate);
            $scope.tickets[i].sellDate = d.getFullYear()+'/'+d.getMonth()+1+'/'+d.getDay()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
        });
    }, function() {
        LoginService.logout();
    });

    $scope.pay = function(ticket){
        ticket.pay = !ticket.pay;
        TicketService.update(ticket).then(function(response){
        }, function(err){
            alert(err);
            ticket.pay = false;
        });
    }

    $scope.edit = function(ticket){
        $location.search('ticket', ticket._id);
        $location.path('/ticket');
    }

});
