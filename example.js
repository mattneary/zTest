var ztest = require('./ztest');

var result = ztest(function() {
  var i = 100;
  while(i--);
  return;
}, function() {
  var i = 99;
  while(i--);
  return;
}, 1000000);

console.log(result.desc);
