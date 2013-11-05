var ztest = require('./ztest');

var result1 = ztest(function() {
  var i = 100;
  while(i--);
  return;
}, function() {
  var i = 99;
  while(i--);
  return;
});

console.log(result1.desc);

// throw error if too slow
try {
  var result2 = ztest(function() {
    var i = 100;
    while(i--);
    return;
  }, function() {
    var i = 1000000;
    while(i--);
    return;
  });
} catch(err) {
  console.log(err);
}

