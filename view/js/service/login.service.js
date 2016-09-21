sellTickets.service('LoginService', function($http, $q, $location){
    this.login = function(user){
        var authorization;
        if(user) {
            authorization = getAuthorization(user);
        } else {
            authorization = getCookie('Authorization')
        }
  		var deferred = $q.defer();
		return $http({
			method: 'GET',
			url: '/api/user',
    		headers: {'Authorization': authorization}
		});
	};

    this.logout = function(){
        setCookie('Authorization', undefined, 0);
        if($location.path() !== '/login'){
            $location.path('/login');
        }
    }
});
