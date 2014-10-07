QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "all letters exist", function( assert ) {
  
  var chars = "abcdefghijklmnopqrstuvwxyz".split('');
  for(var i=0;i<chars.length;i++){
    assert.ok(typeof biro.letters[chars[i]] != 'undefined', chars[i]);
  }
  /*var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  for(var i=0;i<chars.length;i++){
    assert.ok(typeof biro.letters[chars[i]] != 'undefined', chars[i]);
  }*/
    assert.ok(false, 'upper case letters');
});

QUnit.test( "letters are valid", function( assert ) {
  for (var key in biro.letters){
    assert.ok( frame_is_valid(biro.letters[key]), key );
  }
});

QUnit.test( "Utils module is loaded", function( assert ) {
  assert.ok( typeof biro.utils != 'undefined' );
});

QUnit.test( "biro.utils.generateFrames", function( assert ) {
  var startFrame = biro.letters['a'];
  var endFrame = biro.letters['b'];
  var numberOfFrames = 5;
  var frames = biro.utils.generateFrames(startFrame, endFrame, numberOfFrames)
  assert.ok( frames.length > 0, "generateFrames is greater than 0. (" + frames.length + ")" );
});


// API. biro.section
QUnit.test( "biro.section", function( assert ) {

  // Clear the canvas if it already exists.
  removeTestCanvas();

  assert.throws(function(){
    biro.section('test');
  }, "throws an error when a canvas cannot be found");

  // new section
  createTestCanvas();

  var testSection = biro.section('test');
  assert.ok(typeof biro.sections['test'] != 'undefined', "creates a new section");
  assert.ok(typeof biro.sections['test'].ctx != 'undefined', "the new section has a context");

});

QUnit.test( "biro.section.add currentState", function( assert ) {
  createTestCanvas();
  console.log(biro.section('test'));
  assert.ok('add' in biro.section('test'), 'add function exists');

  biro.section('test').add('A', 'hello');
  biro.section('test').add('B', 'cruel');
  biro.section('test').add('C', 'world');

  var currentState = biro.section('test').currentState();
  assert.ok( currentState == 'A', 'currentState');
});

QUnit.test( "biro.section.length and clear", function( assert ) {

  createTestCanvas();

  biro.section('test').clear();
  assert.ok(biro.section('test').length() == 0, 'length == 0 ');
  biro.section('test').add('A', 'hello');
  assert.ok(biro.section('test').length() == 1, 'length == 1');
  biro.section('test').add('B', 'hello');
  assert.ok(biro.section('test').length() == 2, 'length == 2');
  biro.section('test').clear();
  assert.ok(biro.section('test').length() == 0, 'length == 0 ');

});

QUnit.test( "biro.section.transition + currentState + nextState", function( assert ) {
  createTestCanvas();
  biro.section('test').clear();
  biro.section('test').add('A', 'a');
  biro.section('test').add('B', 'b');
  biro.section('test').add('C', 'c');
  assert.equal( biro.section('test').currentState(), 'A', 'currentState A');
  assert.equal( biro.section('test').nextState(), 'B', 'nextState == B');
  biro.section('test').transition('B');
  assert.equal( biro.section('test').currentState(), 'B', 'currentState B');
  assert.equal( biro.section('test').nextState(), 'C', 'nextState == C');

  // Transform with no key, move onto the next one or rather, loops around.
  biro.section('test').transition();
  assert.equal( biro.section('test').currentState(), 'C', 'currentState C');
  assert.equal( biro.section('test').nextState(), 'A', 'nextState == A');
  biro.section('test').transition();
  assert.equal( biro.section('test').currentState(), 'A', 'currentState A');

});



// HELPERS AND MATCHERS=======================================
//

function createTestCanvas(){
  var canvas = document.querySelector("#test");
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.setAttribute("height", 300);
  canvas.setAttribute("width", 300);
  canvas.setAttribute("id", "test");
  body = document.querySelector('body');
  body.appendChild(canvas);
}

function removeTestCanvas(){
  var canvas = document.querySelector("#test");
  if (canvas && canvas.parentNode){
    canvas.parentNode.removeChild(canvas);
  }
}

function frame_is_valid(frame){
  return frame.length == 4 &&
    frame[0].length == 4 &
    // endpoints are equal to start points
    frame[0][3].toString() == frame[1][0].toString() &&
    frame[1][3].toString() == frame[2][0].toString() &&
    frame[2][3].toString() == frame[3][0].toString() &&
    true
}

