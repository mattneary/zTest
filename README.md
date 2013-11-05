zTest
=====
zTest is a benchmarking suite for JavaScript, providing statistical testing of performance "experiments."

Usage
-----
The `zTest` library may be used with Node.js, as in `example.js`, or on the client-side. To perform a test, pass a control function, an experiment function, and a sample size to the `ztest` function.

```javascript
var result = ztest(function() {
  var i = 100;
  while(i--);
  return;
}, function() {
  var i = 99;
  while(i--);
  return;
}, 1000000);
```

Results are encoded as follows.

```json
{
  "fns": [function(){...}, function(){...}],
  "winner": 0,
  "desc": "The null was rejected; the control is more efficient."
}
```

Roadmap
-------
I would like for these tests to be included in a full testing-suite, and made as easy to use as possible. Too often, benchmarking tests have no statistical foundation in their conclusions.
