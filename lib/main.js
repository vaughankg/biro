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


