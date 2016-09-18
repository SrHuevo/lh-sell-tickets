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
});
