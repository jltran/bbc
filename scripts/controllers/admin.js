'use strict';

app.controller('AdminController', function($scope, Users, Header){
  Header.setTitle('Admin Panel');
  $scope.users = Users.all;
  
  $scope.outreachChange = function(uid){
    Users.getUser(uid).$loaded().then(function(data){
      data.outreach = !data.outreach;
      data.$save();
    })
  };
  $scope.counselorChange = function(uid){
    Users.getUser(uid).$loaded().then(function(data){
      data.counselor = !data.counselor;
      data.$save();
    })
  };
  $scope.driverChange = function(uid){
    Users.getUser(uid).$loaded().then(function(data){
      data.driver= !data.driver;
      data.$save();
    })
  };
  $scope.adminChange = function(uid){
    Users.getUser(uid).$loaded().then(function(data){
      data.admin = !data.admin;
      data.$save();
    })
  };
  
});