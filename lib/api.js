biro.sections = {};

// Returns a sectionProxy object which delegates to a section object stored in biro.sections
//
biro.section = function(sectionName){
  return this.sections[sectionName] ? new sectionProxy(sectionName) : createNewSection(sectionName);
}

// Looks for a canvas with an ID of the same name.
function createNewSection(sectionName){
  //canvas = document.querySelector("#".concat(sectionName));
  //if (!canvas) throw "Must exist a canvas called " + sectionName;
  //ctx = canvas.getContext("2d");

  var el  = document.querySelector("".concat("#", sectionName));

  biro.sections[sectionName] = new biroSection(el);

  return new sectionProxy(sectionName);
}

// Section class
//
function biroSection( element )
{
  this.element = element;
  this.canvases = [];
  this.states = {};  //   key: value pairs
  this.currentState = null; // Just the key.... bad name.
}

biroSection.prototype =
{
  add: function(key, value){
    // Create or overwrite
    this.states[key] = value;
    // Add a current state if this is the initial state.
    if (this.currentState == null){
      this.currentState = key;
    }
  },
  clear: function(){
    this.states = {};
    this.currentState = null;
  },
  length: function(){
    return Object.keys(this.states).length;
  },
  nextState: function(){
    var keys = Object.keys(this.states);
    var i = keys.indexOf(this.currentState);
    return (i < keys.length - 1) ? keys[i+1] : keys[0];
  },
  transition: function(toState){

    // If no state is supplied then we use the next one in line
    if (!toState) var toState = this.nextState();

    if (!this.states[toState]){
      throw "Uknown state to trnasition to.";
    }

    var fromText = this.states[this.currentState],
        toText   = this.states[toState],
        larger = Math.max(fromText.length, toText.length);

    this.currentState = toState;

    for (i=this.canvases.length; i<larger; i++){
      console.dir(biro);
      this.canvases[i] = biro.draw.generateCanvas("c" + i, this.element);
    }

    for (i=0; i<this.canvases.length; i++){
      var sLetter = biro.letters[fromText[i]] || biro.letters["Nil"];
      var eLetter = biro.letters[toText[i]] || biro.letters["Nil"];
      var frames = biro.utils.generateFrames(sLetter, eLetter, 3);
      biro.draw.animate(frames, 1, this.canvases[i].ctx); // 1 seconds duration
    }

  }

}

// Proxy to a section instance
//
function sectionProxy(sectionName){
  this.name = sectionName;
  this.add = function(key, value){
    biro.sections[this.name].add(key, value);
  }
  this.currentState = function(){
    return biro.sections[this.name].currentState;
  }
  this.clear = function(){
    biro.sections[this.name].clear();
  }
  this.length = function(){
    return biro.sections[this.name].length();
  }
  this.nextState = function(){
    return biro.sections[this.name].nextState();
  }
  this.transition = function(toState){
    biro.sections[this.name].transition(toState);
  }
}
