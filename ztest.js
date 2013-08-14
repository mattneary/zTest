(function() {
  var root = this;
  var epsilon = .0001;

  var getSample = function(fn, n) {
    var start = (new Date()).getTime(),
    samples = [];
    while(n--) {
      fn();
      var end = (new Date()).getTime();
      samples.push(end - start);
      start = end;
    }
    return samples;
  };

  var Z_MAX = 6;
  var P = function(z) {
    var y, x, w;

    if (z == 0.0) {
      x = 0.0;
    } else {
      y = 0.5 * Math.abs(z);
      if (y > (Z_MAX * 0.5)) {
        x = 1.0;
      } else if (y < 1.0) {
        w = y * y;
        x = ((((((((0.000124818987 * w
	          - 0.001075204047) * w + 0.005198775019) * w
  	          - 0.019198292004) * w + 0.059054035642) * w
	          - 0.151968751364) * w + 0.319152932694) * w
	          - 0.531923007300) * w + 0.797884560593) * y * 2.0;
      } else {
        y -= 2.0;
        x = (((((((((((((-0.000045255659 * y
	                + 0.000152529290) * y - 0.000019538132) * y
	                - 0.000676904986) * y + 0.001390604284) * y
	                - 0.000794620820) * y - 0.002034254874) * y
	                + 0.006549791214) * y - 0.010557625006) * y
	                + 0.011630447319) * y - 0.009279453341) * y
	                + 0.005353579108) * y - 0.002141268741) * y
	                + 0.000535310849) * y + 0.999936657524;
      }
    }
    return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5);
  };

  var summaryStats = function(sample) {
    var n = sample.length,
      avg = sample.reduce(function(a, b) {
        return a+b;
      }) / n,
      variance = sample.reduce(function(a, b) {
        return a + Math.pow(a - avg, 2);
      }, 0) / n,
      std = Math.sqrt(variance),
      se = std / Math.sqrt(n);
    return {
      std: std,
      mean: avg,
      se: se
    };
  };

  var compare = function(control, experiment, n) {
    var muStats = summaryStats(getSample(control, n));
    var Mstats = summaryStats(getSample(experiment, n));
    if( muStats.std - Mstats.std < epsilon ) {
      var zScore = (Mstats.mean - muStats.mean)/muStats.se;
      var p = P(zScore);
      if( p < .05 ) {
        var winner =  Mstats.mean < muStats.mean ? 1 : 0;
        return {
          fns: [control, experiment],
          winner: winner,
          desc: "The null was rejected; the "+(winner==0?"control":"experiment")+" was more efficient."
        };
      } else {
        return {
          fns: [control, experiment],
          winner: null,
          desc: "The null failed to be rejected; the more efficent function is undetermined."
        };
      }
    } else {
      throw "Z-Test could not be performed; µ undeterminable.";
    }
  };

  if( module ) {
    module.exports = compare;
  } else {
    root.ztest = compare;
  }
}());
