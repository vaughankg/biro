(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Each letter is comprised of 4 quadratic bezier curves. The end point of each curve is the start point of the next one, thus a letter is one continuous line.

module.exports = {
  'Nil': [
    [ [300, 250], [300, 250], [300, 250], [300, 250] ],
    [ [300, 250], [300, 250], [300, 250], [300, 250] ],
    [ [300, 250], [300, 250], [300, 250], [300, 250] ],
    [ [300, 250], [300, 250], [300, 250], [300, 250] ]
  ],
  'a': [
    [ [376, 120], [333, 58 ], [248, 95 ], [232, 161] ],
    [ [232, 161], [228, 176], [279, 213], [315, 214] ],
    [ [315, 214], [367, 215], [376, 176], [378, 139] ],
    [ [378, 139], [381, 108], [408, 240], [403, 226] ]
  ],
  'b': [
    [ [246, 91 ], [246, 76 ], [245, 320], [247, 335] ],
    [ [247, 335], [249, 354], [253, 208], [345, 221] ],
    [ [345, 221], [456, 237], [355, 367], [341, 372] ],
    [ [341, 372], [303, 385], [246, 374], [247, 335] ]
  ],
  'c': [[[381, 158], [362, 108], [291, 113], [263, 114]],
  [[263, 114], [230, 115], [129, 138], [128, 204]],
  [[128, 204], [127, 290], [174, 311], [220, 321]],
  [[220, 321], [307, 340], [382, 319], [378, 284]]],
  'd': [[[359, 59], [359, 44], [432, 301], [363, 359]],
 [[363, 359], [344, 375], [286, 377], [258, 361]],
 [[258, 361], [189, 322], [214, 275], [220, 261]],
 [[220, 261], [256, 177], [383, 252], [368, 253]]],
  'e': [[[182, 227], [269, 231], [350, 252], [357, 188]],
 [[357, 188], [369, 80], [261, 72], [184, 161]],
 [[184, 161], [135, 218], [135, 257], [180, 294]],
 [[180, 294], [239, 342], [327, 343], [359, 325]]],
  'f': [[[360, 122], [348, 113], [235, 123], [250, 206]],
 [[250, 206], [253, 221], [287, 373], [272, 374]],
 [[272, 374], [233, 377], [283, 288], [211, 287]],
 [[211, 287], [196, 287], [365, 262], [350, 264]]],
  'g': [[[377, 191], [368, 221], [242, 231], [234, 186]],
 [[234, 186], [216, 84], [320, 43], [373, 110]],
 [[373, 110], [382, 122], [413, 235], [376, 315]],
 [[376, 315], [344, 384], [265, 320], [250, 318]]]

}


},{}],2:[function(require,module,exports){
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

//hardCoded CONST======================================
var numberOfInterpolations = 3,
    HEIGHT = 500,
    WIDTH = 600;

// MAIN================================================

var letters = require('./letters.js');
var utils = require('./temp.js');

startFrame = letters['a'];
endFrame = letters['b'];

var frames = utils.generateFrames(startFrame, endFrame, numberOfInterpolations);

var canvases = utils.generateCanvases(document.querySelector("body"), frames.length);

var animationCanvas = document.querySelector("#output"),
    animationCtx = animationCanvas.getContext("2d");

utils.drawFramesToCanvases(frames, canvases);

var anim = function(){
 return utils.animate(frames, 1, animationCtx);
}

anim();



},{"./letters.js":1,"./temp.js":3}],3:[function(require,module,exports){
module.exports = {

  // maps to interpolate fnciotn right now but might use a differnt logic int he future.
  generateFrames: function(startFrame, endFrame, num){
    return interpolate(startFrame, endFrame, num);
  },

  // Takes a set of frames and draws then 1-to-1 on a set of canvas objects.
  drawFramesToCanvases: function(frames, canvases){
    if (frames.length != canvases.length) throw "Frames canvases must have the same cardinality.";
    for (var i = 0; i < canvases.length; i++){
      drawLetter(canvases[i].ctx, frames[i]);
    }
  },

  //Generate Canvases for Testing
  generateCanvases: function(el, num){
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
  },

  //UTILS=============================================================

  drawLetter: function(ctx, curves){
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
  },

  interpolatePoints: function(p1, p2) {
    var arr =[];
    arr[0] = (p1[0] + p2[0]) / 2;
    arr[1] = (p1[1] + p2[1]) / 2;

    return arr;
  },

  interpolateVectors: function(v1, v2){
    var arr = [];
    for (var i =0; i < v1.length; i++){
      arr.push(interpolatePoints(v1[i], v2[i]));
    }
    return arr;
  },

  interpolateMatrices: function(m1, m2) {
    var arr = [];
    for (var i =0; i < m1.length; i++){
      arr.push(interpolateVectors(m1[i], m2[i]));
    }
    return arr;
  },

  interpolate: function(startFrame, endFrame, numberOfInterpolations){
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
  },


  animate: function(frames, duration, ctx){
    var timePerFrame = (duration * 1000)/ frames.length;
    var step = 0;
    var previous_timestamp = null;

    animloop(0);

    function animloop(timestamp){
      if (previous_timestamp === null) previous_timestamp = timestamp;
      window.requestAnimationFrame(animloop);
      if (timestamp - previous_timestamp > timePerFrame){
        if (step < frames.length){
          drawNextFrame(frames, step);
          step++;
        }
        previous_timestamp = timestamp;
      }
    }

    function drawNextFrame(frames, step) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawLetter(ctx, frames[step]);
    }

  },

  //UNSED BUT USEFUL IN THE FUTURE
  NotUsedinterpolatePoints: function(v1, v2){
    return map2(function (x, xPrime){
      return (x + xPrime) / 2;
    }, v1, v2);
  },

  NotUsedStrictlyTest: function(v1, v2, v3){
    return map2(function (x, xPrime, xSecondPrime){
      return (x + xPrime + xSecondPrime) / 3;
    }, v1, v2, v3);
  },


/*
   Better map. Takes an arbitrary number of collections
   Not Performance optimized
   */

  map2: function(){
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

}

//console.log(NotUsedinterpolatePoints([1, 2, 4], [4, 5 ,6]));
//console.log(NotUsedStrictlyTest([1, 2, 4], [4, 5 ,6], [7, 8, 9]));

},{}]},{},[2]);
