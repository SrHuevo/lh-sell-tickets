sellTickets.controller('NavController' , function($scope, $location){
    $scope.getCookie = getCookie;
    $scope.$location = $location;
    $scope.salir = function(){
        console.log("salir");
    }
    console.log("siempre");
});
