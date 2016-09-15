sellTickets.service('TicketService', function($http, $q){
    this.newTicket = function(ticket){
  		var deferred = $q.defer();
		return $http({
			method: 'PUT',
			url: '/api/sell',
    		headers: {'Authorization': getCookie('Authorization')},
            data: ticket
		});
	};
});
