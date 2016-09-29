sellTickets.service('MailMasiveService', function($http){
    this.sendMailFinal = function(){
		return $http({
			method: 'POST',
			url: '/api/sell/mailfinal',
    		headers: {'Authorization': getCookie('Authorization')}
		});
	};
});
