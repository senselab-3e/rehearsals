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
    /// needs https://p5js.org/reference/#/p5/touches



    cnv.mousePressed(canvasPressed);
    //background(232); // wherever possible, applying color styling through the class css, if you are already assigning and using one anyways. 
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

    text('record?', width / 2, height / 2);
    cnv.removeClass('hide-canvas');
    cnv.addClass('show-canvas');
    //why are elements stacked on top of each other after the first click to record? some refactoring for how to add and remove classes for hidding things, needs to be rethought
    document.getElementById('startContext').classList.add('hide-canvas');
}

//this needs to be refactors for having more button/responses based on user intereactions. 
// look at how the movement from 'start' to clicking 'record' again, goes. i've added a bit of a css transition using hover for the start to the record? ---> but because of how the p5 is being leaned on through conditionals, it makes it unnecessarily complex to change the stylings. it would be better to refactor, just adding and removing classes, that each take care of those stylings. instead you have conflicting styles happening afrer the second 'else' conditition that removes show recording class, after it's first use



function canvasPressed() {
    // ensure audio is enabled
    userStartAudio();


    // make sure user enabled the mic
    if (!state && mic.enabled) {

        // record to our p5.SoundFile
        recorder.record(soundfiles[i]);

        // background(255, 0, 0);
        // fill(255);
        text('recording!', width / 2, height / 2);
        cnv.addClass('show-rec');
        state = true;
    } else if (state) {
        /// this is trying to compensate for not removing elements and hiding unnecessary complexities in how things are being 'hidden'. if you take away the background coloring from this js, you can see where a redundency occures, making it harder to shift things to a cleaner css styling to create more hover responses for the button/ based on user interactions. I can build all of this in js using evenlistener - but it would be better to trying this out yourself.... this form is only getting away with it because the grey background color is blocking the appearance of the other element under it. // which then means all the background color is being leaned on in the js instead of more legibly in the css. js styling here is built around exception and conditions /// where as by simply adding or removing css classes you only are juggling one state at a time.  
        // background(232);

        // stop recorder and
        // send result to soundFile
        recorder.stop();
        // fill(0);
        text('record?', width / 2, height / 2);
        // cnv.addClass('hide-canvas');
        cnv.removeClass('show-rec');

        popSound(i);

        console.log(soundfiles);

        i++;
        soundfiles[i] = new p5.SoundFile();
        state = false;
    }
}

// function mouseButton(){

//     const buttonArea = document.querySelector('.buttonAnchor');
//     if (pmouseX < 100 && pmouseY < 100 && pmouseX > 10 && pmouseY > 10) {
//         console.log('button area')
//         //const styleCircle = document.querySelector('.show-canvas')
//         buttonArea.style.background = 'yellow'
//     }
//     else {
//         buttonArea.style.background = 'yellow'
//     }
// }

function draw() {

    //mouseButton()


    if (state) {
        let time = millis();
        clear();
        noStroke();
        fill(255, 0, 0); // red inner circle
        ellipse(width / 2, height / 2, 50 * sin(millis() / 1000), 50 * sin(millis() / 1000));
        fill(255);
        translate(width / 2, height / 2);

        rotate(j / 50);
        text('recording!', 0, 0);
        j++;
    } else {
        /// all of this is easier managed by adding and removing class names. then you can have more sophisticaled ontouch on hover actions....it's also much more legible 
        background(232); // as soon as i remove this, to try and rely on the css alone, there are two elements stacked on each other, visually. this reveals what's actually happening below the hood redundencies. it shouldn't even be there.'

        fill(0); // 
        text('record?', width / 2, height / 2);
        j = 0;
    }
}
// soundFile.play(); // play the result!
// save(soundFile, 'mySound.wav');