sellTickets.controller('NavController' , function($scope, $location, LoginService){
    $scope.getCookie = getCookie;
    $scope.$location = $location;
    if(!getCookie('Authorization')){
        LoginService.logout();
        return;
    }
    LoginService.login(decodeAuthorization(getCookie('Authorization'))).then(function(resp){
        $scope.user = resp.data;
    }, function(err) {
        LoginService.logout();
    });

    $scope.salir = function(){
        LoginService.logout();
    }
});
