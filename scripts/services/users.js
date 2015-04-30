'use strict';

app.factory('Users', function(FURL, $firebase){
  var ref = new Firebase(FURL);
  var users = $firebase(ref.child('profile')).$asObject();
  var arr = $firebase(ref.child('profile')).$asArray();
  
  var Users = {
    all: users,
    getUser: function(uid){
      return $firebase(ref.child('profile').child(uid)).$asObject();
    },
    usersAsArray: arr, 
  }
  
  return Users
});