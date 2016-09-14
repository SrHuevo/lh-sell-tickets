sellTickets.controller('NavController', ['$scope', function($scope){
    $scope.getCookie = getCookie;
    $scope.salir = function(){
        console.log("salir");
    }
    console.log("siempre");
}]);
