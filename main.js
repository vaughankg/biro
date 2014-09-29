//hardCoded CONST======================================
var numberOfInterpolations = 3,
    HEIGHT = 500,
    WIDTH = 600,

// MAIN================================================

startFrame = letters['a'];
endFrame = letters['b'];

var frames = generateFrames(startFrame, endFrame, numberOfInterpolations);

var canvases = generateCanvases(document.querySelector("body"), frames.length);

var animationCanvas = document.querySelector("#output"),
    animationCtx = animationCanvas.getContext("2d");

drawFramesToCanvases(frames, canvases);

var anim = function(){
 return animate(frames, 1, animationCtx);
}

anim();


