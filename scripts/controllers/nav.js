'use strict';

app.controller('NavController', function($scope, $location, Auth, Header){
  
  $scope.currentUser = Auth.user;
  $scope.signedIn = Auth.signedIn;
  $scope.header = Header;
  $scope.isAdmin = Auth.isAdmin;
  
  $scope.logout = function(){
    Auth.logout();
    Materialize.toast('You have logged out successfully', 3000);
    $location.path('/');
  };
});