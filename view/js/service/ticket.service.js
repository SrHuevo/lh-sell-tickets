sellTickets.service('TicketService', function($http, $q){
    this.newTicket = function(ticket){
        var newTicket = angular.copy(ticket);
        newTicket.inmortal = newTicket.inmortal ? 1 : 0;
  		var deferred = $q.defer();
		return $http({
			method: 'PUT',
			url: '/api/sell',
    		headers: {'Authorization': getCookie('Authorization')},
            data: newTicket
		});
	};


    this.getTicket = function(ticketId){
        return $http({
			method: 'GET',
			url: '/api/sell/'+ticketId,
    		headers: {'Authorization': getCookie('Authorization')}
        });
    }

    this.delete = function(ticketId){
        return $http({
			method: 'DELETE',
			url: '/api/sell/'+ ticketId,
    		headers: {'Authorization': getCookie('Authorization')}
		});
    }

    this.reSend = function(ticketId){
        return $http({
			method: 'POST',
			url: '/api/sell/'+ ticketId,
    		headers: {'Authorization': getCookie('Authorization')}
		});
    }

    this.update = function(ticket){
        return $http({
			method: 'POST',
			url: '/api/sell',
    		headers: {'Authorization': getCookie('Authorization')},
            data: ticket
		});
    }
});
