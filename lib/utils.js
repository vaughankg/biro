biro.utils = {

  // maps to interpolate function right now but might use a differnt logic int he future.

  generateFrames: function(startFrame, endFrame, num){
    return interpolate(startFrame, endFrame, num);
  }

}

function interpolatePoints(p1, p2) {
    var arr =[];
    arr[0] = (p1[0] + p2[0]) / 2;
    arr[1] = (p1[1] + p2[1]) / 2;

    return arr;
  }

  function interpolateVectors(v1, v2){
    var arr = [];
    for (var i =0; i < v1.length; i++){
      arr.push(interpolatePoints(v1[i], v2[i]));
    }
    return arr;
  }

  function interpolateMatrices (m1, m2) {
    var arr = [];
    for (var i =0; i < m1.length; i++){
      arr.push(interpolateVectors(m1[i], m2[i]));
    }
    return arr;
  }

  function interpolate(startFrame, endFrame, numberOfInterpolations){
    if (!startFrame || !endFrame){
      throw "start and end frame required";
    }
    var steps = numberOfInterpolations || 1;

    function recurInterpolate(left, right, level, accum){
      accum = accum || [left, right];

      var derived = interpolateMatrices(left, right),
          startPos = accum.indexOf(left),
          endPos = accum.indexOf(right);

      if (startPos !== -1 && endPos !== -1){
        accum.splice(endPos, 0, derived);
        level--;

        if (level < 1)
          return accum;


        var rightHandDerivation = recurInterpolate(derived, right, level, accum);

        return recurInterpolate(rightHandDerivation[0], rightHandDerivation[1], level, rightHandDerivation);

      } else {
        throw "Yikes Frames got dropped!";
      }


    }

    return recurInterpolate(startFrame, endFrame, steps);
  }

  //UNSED BUT USEFUL IN THE FUTURE
  function NotUsedinterpolatePoints(v1, v2){
    return map2(function (x, xPrime){
      return (x + xPrime) / 2;
    }, v1, v2);
  }

  function NotUsedStrictlyTest(v1, v2, v3){
    return map2(function (x, xPrime, xSecondPrime){
      return (x + xPrime + xSecondPrime) / 3;
    }, v1, v2, v3);
  }


/*
   Better map. Takes an arbitrary number of collections
   Not Performance optimized
   */

  function map2(){
  var result = [],
      collections = Array.prototype.slice.call(arguments, 0),
      fn = collections.shift();

  var short = (function (c){
    if (!c || !c instanceof Array || c.length === 0)
    return null;
  var short = c[0];
  for (var i=0; i<c.length; i++){
    if (c[i] < short)
    short = c[i];
  }

  return short;
  })(collections);

  for (var i=0; i < short.length; i++){
    var args = collections.map(function(vector){
      return vector[i];
    });
    result[i] = fn.apply(null, args);
  }
  return result;
}


//console.log(NotUsedinterpolatePoints([1, 2, 4], [4, 5 ,6]));
//console.log(NotUsedStrictlyTest([1, 2, 4], [4, 5 ,6], [7, 8, 9]));
