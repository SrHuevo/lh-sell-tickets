sellTickets.controller('NavController' , function($scope, $location, LoginService){
    $scope.getCookie = getCookie;
    $scope.$location = $location;
    $scope.salir = function(){
        LoginService.logout();
    }
});
