'use strict';

app.factory('Header', function(){
  var title = 'Outreaches';
  return {
    title: function() {return title; },
    setTitle: function(newTitle) { title = newTitle; }
  }
})