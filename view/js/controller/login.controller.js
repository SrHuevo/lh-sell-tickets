sellTickets.controller('LoginController', function($scope, $location, LoginService){
    $scope.user = {mail:'',pass:''};
    $scope.submitForm = function(){
        var user = angular.copy($scope.user);
        LoginService.login($scope.user).then(
            function(){
                setCookie('Authorization', getAuthorization(user), 100);
                $location.path('/ticket');
            }, function() {

                LoginService.logout();
            }
    )};
});
