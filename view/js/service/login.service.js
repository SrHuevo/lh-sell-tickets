sellTickets.service('LoginService', function($http, $q, $location){
    this.login = function(user){
  		var deferred = $q.defer();
		return $http({
			method: 'GET',
			url: '/api/user',
    		headers: {'Authorization': getAuthorization(user)}
		});
	};

    this.logout = function(){
        setCookie('Authorization', undefined, 0);
        if($location.path() !== '/login'){
            $location.path('/login');
        }
    }
});
