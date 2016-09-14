sellTickets.controller('RegisterController', function($scope, LoginService, RegisterService){
    inicializeRegister();
    $scope.submitForm = function(){
        if($scope.pass1 !== $scope.pass2){
            alert("Las contraseñas no coinciden");
            return;
        }
        var user = {mail: $scope.user.mail, pass: $scope.user.pass1, site: 1, permisionLevel: 1};

        RegisterService.register(user).then(
            function(){
                $('#modalRegister').modal('show');
                inicializeRegister();
            }, function() {
                inicializeRegister();
                LoginService.logout();
            }
    )};

    function inicializeRegister(){
        $scope.user={name:'', pass1:'', pass2: ''};
    }
});
