'use strict';

app.factory('Outreach', function(FURL, $firebase){
  var ref = new Firebase(FURL);
  var outreaches = $firebase(ref.child('outreaches')).$asArray();
  
  var Outreach = {
    all: outreaches,
    getOutreach: function(oid){
      return $firebase(ref.child('outreaches').child(oid));
    },
    addAsOutreachWorker: function(user, oid){
      var ow_obj = {}
      var onComplete = function(error){
        if(error){
          Materialize.toast('There has been an error in adding you to the outreach', 3000);
        } else {
          Materialize.toast('You have been added to the outreach', 3000);
        }
      }
      var getOW = new Firebase(FURL + 'outreaches/' + oid);
      getOW.once("value", function(snapshot){
        ow_obj = snapshot.val();
        ow_obj.outreachworkers.push(user.profile.name);
      })
      return getOW.update(ow_obj, onComplete);
    },
    createOutreach: function(outreach){
      var date = moment(outreach.date).format('x');
      var start = moment(outreach.start).format('x');
      var end = moment(outreach.end).format('x');
      outreach.start = moment(parseInt(date)+parseInt(start), 'x').format('x');
      outreach.end = moment(parseInt(date)+parseInt(end), 'x').format('x');
      delete outreach.date;
      var fb = $firebase(ref.child('outreaches')).$asArray();
      return fb.$add(outreach);
    },
    counselorSignUp: function(currentUser, outreach){
      currentUser.$loaded().then(function(){
        var counselor = {'name':currentUser.name, 'gravatar':currentUser.gravatar,'email':currentUser.email}
        if (outreach.hasOwnProperty('counselors')){
          if (!(counselor in outreach.counselors)){
            outreach.counselors.push(counselor);
            outreach.$save();
          }
        } else {
          outreach.counselors = [counselor]; 
          outreach.$save();
        }
      });
      return
    },
    outreachworkerSignUp: function(currentUser, outreach){
      currentUser.$loaded().then(function(){
      var outreachWorker = {'name':currentUser.name, 'gravatar':currentUser.gravatar,'email':currentUser.email}
      if (outreach.hasOwnProperty('outreachworkers')){
        if (!(outreachWorker in outreach.outreachworkers)){
          outreach.outreachworkers.push(outreachWorker);
          outreach.$save();
        }
      } else {
        outreach.outreachworkers = [outreachWorker]; 
        outreach.$save();
      }
    });
    return
    },
    
  };
  
  return Outreach
});