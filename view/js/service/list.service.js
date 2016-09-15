sellTickets.service('ListService', function($http, $q){
    this.getTickets = function(){
  		var deferred = $q.defer();
		return $http({
			method: 'GET',
			url: '/api/sell',
    		headers: {'Authorization': getCookie('Authorization')}
		});
	};
});
