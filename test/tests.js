QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "all letters exist", function( assert ) {
  var chars = "abcdefghijklmnopqrstuvwxyz".split('');
  for(var i=0;i<chars.length;i++){
    assert.ok(typeof letters[chars[i]] != 'undefined', chars[i]);
  }
  /*var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  for(var i=0;i<chars.length;i++){
    assert.ok(typeof letters[chars[i]] != 'undefined', chars[i]);
  }*/
    assert.ok(false, 'upper case letters');
});

QUnit.test( "letters are valid", function( assert ) {
  for (var key in letters){
    assert.ok( frame_is_valid(letters[key]), key );
  }
});

QUnit.test( "generateFrames", function( assert ) {
  var startFrame = letters['a'];
  var endFrame = letters['b'];
  var numberOfFrames = 3;
  var frames = generateFrames(startFrame, endFrame, numberOfFrames)
  assert.ok( frames.length > 0, "generateFrames is greater than 0. (" + frames.length + ")" );
});

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

