//https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial
//http://www.vexflow.com/vextab/tutorial.html
//https://jsfiddle.net/8eckj32x/13/
var drawStaff = function(flashCards1,currentFlashCard1){
  VF = Vex.Flow;
  
  // Create an SVG renderer and attach it to the DIV element named "boo".
  var staffDiv = document.getElementById("staff")
  staffDiv.innerHTML = "";

  var renderer = new VF.Renderer(staffDiv, VF.Renderer.Backends.SVG);
  
  // Configure the rendering context.
  renderer.resize(440, 320);
  var context = renderer.getContext();
  context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
  
  // Create a staff of width 400 at position 10, 40 on the canvas.
  var trebleStaff = new VF.Stave(30, -10, 140);
  var bottomStaff = new Vex.Flow.Stave(30, 70, 140);
  var brace = new Vex.Flow.StaveConnector(trebleStaff, bottomStaff).setType(3);
  var lineLeft = new Vex.Flow.StaveConnector(trebleStaff, bottomStaff).setType(1);
  var lineRight = new Vex.Flow.StaveConnector(trebleStaff, bottomStaff).setType(6);
    
  // Add a clef and time signature.
  trebleStaff.addClef("treble").addTimeSignature("4/4");
  bottomStaff.addClef('bass').addTimeSignature("4/4");
  
  //Draw Brace, front and end lines
  trebleStaff.setContext(context).draw();
  bottomStaff.setContext(context).draw();
  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  lineRight.setContext(context).draw();
  context.scale(1.7,1.7);
  var item = flashCards1[currentFlashCard1];
  var currentNote = item.note + "/" + item.octave;
  
  // Render voice
  if(item.staff==0)
  {
    var notesBass = [
      new VF.StaveNote({clef:"bass", keys: [currentNote], duration: "w", scale:1 })
    ];  
    var voiceBass = new VF.Voice({num_beats: 4,  beat_value: 4});
    voiceBass.addTickables(notesBass);
    var formatterBass = new VF.Formatter().joinVoices([voiceBass]).format([voiceBass], 400);
    voiceBass.draw(context, bottomStaff);
  }
  else{
    var notes = [
      new VF.StaveNote({ keys: [currentNote], duration: "w", scale:1 })
    ];
    var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, trebleStaff);
  }
}