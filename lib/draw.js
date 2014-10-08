biro.draw = {
  HEIGHT: 500,

  WIDTH: 600,

  // Takes a set of frames and draws then 1-to-1 on a set of canvas objects.
  drawFramesToCanvases: function(frames, canvases){
    if (frames.length != canvases.length) throw "Frames canvases must have the same cardinality.";
    for (var i = 0; i < canvases.length; i++){
      drawLetter(canvases[i].ctx, frames[i]);
    }
  },

  generateCanvas: function (id, parent){
    var canvas = document.createElement("canvas");
    canvas.setAttribute("height", this.HEIGHT);
    canvas.setAttribute("width", this.WIDTH);
    canvas.setAttribute("id", id);
    parent && parent.appendChild && parent.appendChild(canvas);
    return {
       "canvas" : canvas,
       "ctx"    : canvas.getContext("2d")
    }
  },

  //Generate Canvases for Testing
  generateCanvases: function(el, num){
    var canvases = []
      for (var i =0; i<num; i++){
        var canvasWrapper = this.generateCanvas(i)
        el.appendChild(canvasWrapper.canvas);
        canvases.push(canvasWrapper)
      }
    return canvases
  },

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

  animate: function(frames, duration, ctx){
    var timePerFrame = (duration * 1000)/ frames.length;
    var step = 0;
    var previous_timestamp = null;

    var donkeyBalls = this.drawLetter;

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
      console.log(donkeyBalls);
      donkeyBalls.call(this, ctx, frames[step]);
    }

  },

} // end of module
