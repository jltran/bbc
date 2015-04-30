'use strict';

app.controller('AuthController', function($scope, $location, Auth) {
  $scope.register = function(user){
    Auth.register(user).then(function(data){
      Materialize.toast('You have registered successfully', 3000);
      $location.path('/browse');
    }, function(err){
      Materialize.toast('There has been an error in your registration', 3000);
    })
  };
  
  $scope.login = function(user){
    Auth.login(user).then(function(){
      Materialize.toast('You have logged in successfully', 3000);
      $location.path('/browse');
    }, function(err){
      Materialize.toast('There has been an error with your log-in', 3000);
    })
  };
});
  