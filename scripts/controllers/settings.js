'use strict';

app.controller('SettingsController', function($scope, Auth, Header, $location){
  Header.setTitle('Settings');
  $scope.currentUser = Auth.user;
  
  $scope.changePassword = function(email, user){
    user.email = email;
    console.log(email);
    Auth.changePassword(user)
      .then(function(data){
      //Reset Form Info
        $scope.user.oldpass = '';
        $scope.user.newpass = '';
        $scope.user.confirmpass = '';
      
        Materialize.toast('You have successfully changed your password', 3000);
        $location.path('/');
    }, function(err){
      Materialize.toast('There has been an error in changing your password', 3000);
    });
  };
});