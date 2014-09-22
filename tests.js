//hardCoded CONST======================================
var numberOfFrames = 3,
    HEIGHT = 500,
    WIDTH = 600,

// Letters
startFrame = letters['A'];
endFrame = letters['B'];

assert( frame_is_valid(startFrame), 'startFrame is valid');
assert( frame_is_valid(endFrame), 'startFrame is valid');

// generateFrames
var frames = generateFrames(startFrame, endFrame, numberOfFrames)
assert(
    frames.length > 0,
    "generateFrames is greater than 0: " + frames.length
);


// HELPERS AND MATCHERS=======================================
//

function frame_is_valid(frame){
  return frame.length == 4 &&
    frame[0].length == 4 &
    // endpoints are equal to start points
    frame[0][3].toString() == frame[1][0].toString() &&
    frame[1][3].toString() == frame[2][0].toString() &&
    frame[2][3].toString() == frame[3][0].toString() &&
    true
}
