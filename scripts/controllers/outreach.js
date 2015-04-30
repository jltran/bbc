app.controller('OutreachController', function($scope, $location, Outreach, Auth, $routeParams, Header){
  $scope.outreaches = Outreach.all;
  $scope.currentUser = Auth.user;
  Header.setTitle('Outreaches');
  
  if($routeParams.oid) {
		$scope.highlightedOutreach = Outreach.getOutreach($routeParams.oid).$asObject();
	}
  
  $scope.addAsOutreachWorker = function(){
    Outreach.addAsOutreachWorker($scope.currentUser, $routeParams.oid);
  };
  
  //Range function for ng-repeat
  $scope.range = function(n){
    return new Array(n);
  };
});