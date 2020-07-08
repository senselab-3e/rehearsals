let mic, recorder;
let soundfiles = [];
let state = false;
let i = 0;
let j = 0;
let cnv;

function setup() {
  cnv = createCanvas(100, 100);
  cnv.parent('container');
  cnv.class('hide-canvas');
  cnv.mousePressed(canvasPressed);
  background(232);
  textAlign(CENTER, CENTER);
}

function audioInitP5() {
  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundfiles[i] = new p5.SoundFile();

  text('record?', width/2, height/2);
  cnv.removeClass('hide-canvas');
  cnv.addClass('show-canvas');
  document.getElementById('startContext').classList.add('hide-canvas');
}

function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();

  // make sure user enabled the mic
  if (!state && mic.enabled) {

    // record to our p5.SoundFile
    recorder.record(soundfiles[i]);

    background(255,0,0);
    fill(255);
    text('recording!', width/2, height/2);
    cnv.addClass('show-rec');
    state=true;
  }
  else if (state) {
    background(232);

    // stop recorder and
    // send result to soundFile
    recorder.stop();
    fill(0);
    text('record?', width/2, height/2);
    cnv.removeClass('show-rec');

    popSound(i);

    console.log(soundfiles);

    i++;
    soundfiles[i] = new p5.SoundFile();
    state=false;
  }
}

function draw() {
  if (state) {
    let time = millis();
    clear();
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2, height/2, 50*sin(millis()/1000), 50*sin(millis()/1000));
    fill(255);
    translate(width / 2, height / 2);

    rotate(j/50);
    text('recording!', 0, 0);
    j++;
  }
  else {
    background(232);
    fill(0);
    text('record?', width/2, height/2);
    j=0;
  }
}
// soundFile.play(); // play the result!
// save(soundFile, 'mySound.wav');
