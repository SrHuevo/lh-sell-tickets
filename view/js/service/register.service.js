sellTickets.service('RegisterService', function($http, $q){
    this.register = function(user){
  		var deferred = $q.defer();
		return $http({
			method: 'PUT',
			url: '/api/user',
    		headers: {'Authorization': getCookie('Authorization')},
            data:user
		});
	};
});
