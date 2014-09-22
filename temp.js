/*
Goal:
Interpolation is method for generating intermeditary frames (which is likely the simplest)
Tween each curver to curver, nil to curve,curve to nil

TO DO ITEMS
-Dynamically Construct canvases
-finish Map function
-genericise Interpolate

animateButton
hardCoded logic, refactor
tests
more letters
view-source:http://www.victoriakirst.com/beziertool/script.js
http://www.victoriakirst.com/beziertool/
https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Drawing_shapes
*/

// maps to interpolate fnciotn right now but might use a differnt logic int he future.
function generateFrames(startFrame, endFrame, num){
  return interpolate(startFrame, endFrame, num);
}

// Takes a set of frames and draws then 1-to-1 on a set of canvas objects.
function drawFramesToCanvases(frames, canvases){
  if (frames.length != canvases.length) throw "Frames canvases must have the same cardinality.";
  for (var i = 0; i < canvases.length; i++){
    drawLetter(canvases[i].ctx, frames[i]);
  }
}

//Generate Canvases for Testing
function generateCanvases(el, num){
  var canvases = []
  for (var i =0; i<num; i++){
    var canvas = document.createElement("canvas");
    canvas.setAttribute("height", HEIGHT);
    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("id", "c" + i);
    canvases.push({
      "canvas" : canvas,
      "ctx"    : canvas.getContext("2d")
    })
    el.appendChild(canvas);
  }
  return canvases
}

//UTILS=============================================================

function drawLetter(ctx, curves){
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#333";
  curves.forEach(function (curveCoord) {
    var startPoint = curveCoord[0],
        cPoint1 = curveCoord[1],
        cPoint2 = curveCoord[2],
        endPoint = curveCoord[3];

    ctx.moveTo(startPoint[0], startPoint[1]);
    ctx.bezierCurveTo(cPoint1[0], cPoint1[1], cPoint2[0], cPoint2[1], endPoint[0], endPoint[1]);
  });
  ctx.stroke();
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

function interpolateMatrices(m1, m2) {
 var arr = [];
 for (var i =0; i < m1.length; i++){
   arr.push(interpolateVectors(m1[i], m2[i]));
 }
 return arr;
}

function interpolate(startFrame, endFrame, numberOfInterpolations){
  /*
  Old Interpolated
  var b2 = interpolateMatrices(letters['Nil]'], letters['B]']);
  var b1 = interpolateMatrices(letters['Nil]'], b2);
  var b3 = interpolateMatrices(b1, letters['B]']);
  var frames = [letters['Nil]'], b1, b2, b3, letters['B]']]; //Hard Coded to fix
  */

  if (!startFrame || !endFrame){
    throw "start and end frame required";
  }
  var steps = numberOfInterpolations || 1;

  function recurInterpolate(left, right, level, accum){
    accum = accum || [left, right];

    console.log(level);

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

// Bunch of hardcoded crap to FIX
function animate(frames, duration, ctx) {
  var durationPerFrame = (duration * 1000)/ frames.length;
  var step = 0;

  var timeout = setInterval(function(){
    if (step < frames.length){
      console.log(step);
      drawNextFrame(frames, step);
      step++;

    } else {
      console.log("handle cleared");
      clearInterval(timeout);
    }

    }, durationPerFrame);

  function drawNextFrame(frames, step) {
     ctx.clearRect(0, 0, 600, 500);
     drawLetter(ctx, frames[step]);
  }
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

console.log(NotUsedinterpolatePoints([1, 2, 4], [4, 5 ,6]));
console.log(NotUsedStrictlyTest([1, 2, 4], [4, 5 ,6], [7, 8, 9]));
