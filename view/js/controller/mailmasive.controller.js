sellTickets.controller('MailMasiveController', function($scope, MailMasiveService){
    var user = angular.copy($scope.user);
    $scope.sendMailFinal = function(){
        MailMasiveService.sendMailFinal().then(function(){
            $('#modalMailFinal').modal('show');
        }, function(err) {
            alert('A ocurrido algun error\n'+err.data)
        });
    }
});
