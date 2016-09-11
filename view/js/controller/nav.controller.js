isLogin = true;

sellTickets.controller('NavController', ['$scope', function($scope){
    $scope.isLogin = isLogin;
    $scope.salir = function(){
        console.log("salir");
    }
    console.log("siempre");
}]);
