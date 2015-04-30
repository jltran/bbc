'use strict';

app.controller('DisplayController', function($scope, Outreach, $routeParams, Header, Users, $location, Auth){
  $scope.currentUser = Auth.user.uid;
  if (!$scope.currentUser) $scope.currentUser = Auth.user.uid;
  
  //Get Users in array form
  var fbObj = Users.usersAsArray;
  fbObj.$loaded().then(function(data){
    $scope.users = [] 
    for (var i = 0; i < data.length; i++){
      $scope.users.push(data[i]);
    }
  })
  
  //Set header if route
  if($routeParams.oid) {
		$scope.outreach = Outreach.getOutreach($routeParams.oid).$asObject();
    $scope.outreach.$loaded().then(function(data){
      Header.setTitle(data.title);
    })
  } else {
    Header.setTitle('Create Outreach');
  }
  
  //Create
  $scope.create = {};
  $scope.createOutreach = function(){
    //Attach User Object to Outreach
    var driver = Users.getUser($scope.create.driver);
    driver.$loaded().then(function(data){
      $scope.create.driver = {
        'name': data.name,
        'gravatar': data.gravatar,
        'email': data.email
      };
      Outreach.createOutreach($scope.create).then(function(data){
        Materialize.toast('You have successfully created an outreach!', 3000);
      }, function(err){
        Materialize.toast('There has been an error in your outreach creation.', 3000);
      });
      $scope.create = {};
      $location.path('/');
    }); 
  }

  //Enough Counselors (show if still need counselors) & hide if already signed up
  $scope.sufficientCounselors = function(counselor_arr, num_counselors){
    if (counselor_arr && $scope.currentUser){
      var userProps = Users.getUser($scope.currentUser);
      userProps.$loaded().then(function(){
        var counselor_email = userProps.email;
        var counselor_emails = Array();
        for (var couns in counselor_arr){
          counselor_emails.push(counselor_arr[couns].email);
        }
        var alreadySignedUp = counselor_emails.includes(counselor_email);
        var stillNeedCounselors = (counselor_emails.length - 1) < num_counselors;
        if (alreadySignedUp && !stillNeedCounselors) return false
        else return true
      });
    } else {
      if (Auth.isCounselor()) return true
      else return false
    }
  };
  
  $scope.sufficientWorkers = function(outreach_arr, num_outreach){
    if (outreach_arr && $scope.currentUser){
      var userProps = Users.getUser($scope.currentUser);
      userProps.$loaded().then(function(){
        var outreach_email = userProps.email;
        var outreach_emails = Array();
        for (var count in outreach_arr){
          outreach_emails.push(outreach_arr[count].email);
        }
        var alreadySignedUp = outreach_emails.includes(outreach_email);
        var stillNeed = (outreach_emails.length - 1) < num_outreach;
        if (alreadySignedUp && !stillNeed) return false
        else return true
      });
    } else {
      return true
    }
  };
  
  $scope.counselorSignUp = function(outreach){
    var userProps = Users.getUser($scope.currentUser);
    Outreach.counselorSignUp(userProps, outreach);
    $location.path('/outreach/' + outreach.$id);
  };
  
  $scope.outreachworkerSignUp = function(outreach){
    var userProps = Users.getUser($scope.currentUser);
    Outreach.outreachworkerSignUp(userProps, outreach);
    $location.path('/outreach/' + outreach.$id);
  };

});

//Includes PolyFill
if (![].includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}