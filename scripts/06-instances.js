// const propText = "What is it to move with a proposition? What does that do differently?";
// let splitpropText = propText.split(' ');
const width = 500;
const height = 500;



///FIRST PROMPT


let drawMode = 'single';

let prompt1 = function (p) {
    let x = 100;
    let y = 100;
    let words = [];
    const introText = "What is it to move with a proposition? What does that do differently?";
    let arrayIntroText = introText.split(' ');

    function checkMode() {
        switch (drawMode) {
            case 'single':
                drawMode = 'cluster';
                break;
            case 'cluster':
                drawMode = 'smear';
                break;
            case 'smear':
                drawMode = 'cluster';
                seedWords() // this reseeds the whole sentence so it's not just adding the words on loop. BUT. that is a creative decision only. it could be interesting to have them multiply.
                break;
            default:
                drawMode = 'single';
                break;
        }


    }


    const seedWords = () => {
        words = [];
        arrayIntroText.forEach(word => {
            //because this is grabbing the same mouseX mouseY all at the same moment - when it reseeds, it creates the sentence in a cluster
            let wordEl = new Sentences(p.mouseX, p.mouseY, 5, 0, word);
            words.push(wordEl);
        });
    }


    class Sentences {
        constructor(x, y, diam, steps, word) {
            this.x = x;
            this.y = y;
            this.diam = diam;
            this.steps = steps //p.random(115);
            this.opacity = 255;
            this.word = word
            this.stroke = 'black'
        }
        display() {
            // console.log(this.steps)
            if (drawMode === 'single') {
                var x = p.width / 4 * p.noise(0); //if i replace the noise property with noise(0) instead of noise(this.steps) i get a verticality in the movements on the Y
                var y = p.height * p.noise(this.steps);

            } else if (drawMode === 'cluster') {
                var x = p.width / 2 * p.noise(this.steps);
                var y = this.y * p.noise(this.steps + 5);
            } else {
                var x = p.width / 2 * p.noise(this.steps);
                var y = this.y * p.noise(this.steps + 5);
            }
            p.noStroke()
            p.textSize(27)
            this.word ? p.text(this.word, x, y) : this.word = ''; //this is to cover when 'word is undefined'
            // text(this.word, x, y)
        }
        update() {
            this.steps += p.random(0.0025, 0.01);
            var r = 255 * p.noise(this.steps + 1);
            var g = 255 * p.noise(this.steps + 3);
            var b = 255 * p.noise(this.steps + 5);
            p.fill(r, g, b, this.opacity)
        }

    }

    p.setup = function () {
        p.createCanvas(500, 500);
        p.background('white')
        // p.textSize(17)
        // p.fill('#333')
        // p.text('THIS IS A MOVEMENT PRACTICE \n PROPOSITION \n (It should take between 1 hour to 2 hours)', width / 4, height / 2)

    };

    p.draw = function () {
        if (drawMode === 'single') {
            p.background('white')
            // p.push()
            // p.textSize(17)
            // p.fill('#333')
            // p.text('THIS IS A MOVEMENT PRACTICE \n PROPOSITION \n (It should take between 1 hour to 2 hours)', width / 4, height / 2)
            // p.pop()
        } else if (drawMode === 'smear') {

            //no background color is being applied so that the words now smear
        } else if (drawMode === 'cluster') {
            p.background('white');

        } else {
            console.log('unknown mode')
        }

        if (words) {
            for (let m = 0; m < words.length; m++) {
                words[m].display();
                words[m].update();
            }
        }
    };

    p.mousePressed = function () {
        //it's possible to target a specific canvas by calculating the x/y position relative to the distance of the two canvas instances combined. so if mouseY > 500, for example
        //(mouseY > 500) ? console.log('second canvas', mouseY): console.log('first canvas', mouseY)

        if (p.mouseY > 0 && p.mouseY < 500) {
            console.log(true)
            if (arrayIntroText.length > 0) {
                let introWord = new Sentences(p.mouseX, p.mouseY, 5, 0, arrayIntroText[0]);
                words.push(introWord);
                //this is set to switch modes when the word proposition is hit in the text string. it will move things from single mode to cluster
                if (words.length === 9) {
                    checkMode()
                }

            } else {
                console.log('out of words')
                arrayIntroText = introText.split(' ');
                //this is set to trigger a switch mode from cluster to smear - once all the words in the text string have been printed
                checkMode()
                let introWord = new Sentences(p.mouseX, p.mouseY, 5, 0, arrayIntroText[0]);
                words.push(introWord);

            }
            arrayIntroText.splice(0, 1);
        } else {
            // console.log(false)
        }

    };
};

let sketch1 = new p5(prompt1);


//secondPrompt
let prompt2 = function (p) {
    let x = 100;
    let y = 100;
    let words = [];
    const pageTwo = ["It is a STUDY time, so it will require TENDING time.", "As a proposition it also carries the quality\n of being a GIFT. \nAs a gift it also carries the appetite\n to generate gestures of FEED-back to the process and FEEDING-forward.\n But we don't know in advance what feeding forward\n and feeding back is. we generate it in and with\n the practice!\n FIGURE: the cell as process\n TOOLS: \n \t- [ ] a colour patch to create a zone of intensity of colorality\n to hold and suspend a region of contrast as a way\n to modulate the field for engagement into an acossioning\n of experience moving this way this time.\n \t- [ ] a bag to fill with water. preferably warm and cold water to experiment with different temperature as contrasts.\n \t- [ ] one or two pieces of fabric with interesting colour and texture or that carry sparks for an affinity of tonality with the capacity to lure a RELATION DIAGRAM: every movement proposition should take around 15-20 minutes but feel free to shorten and//or expand but keep it time limited so that it finds itself in THIS way, THIS time."];

    const introText = "What is it to move with a proposition? What does that do differently?";
    let arrayIntroText = introText.split(' ');

    let scl = 10;
    let cols;
    let rows;
    let inc = 0.02; // increment value for perlin noise
    let fr; // frame rate for display
    let zoff = 0;
    let particles = [];
    let flowfield;
    let numParticles;
    let modeSelectMenu;
    let drawMode = "ColorSize Variety";
    let reseedMode;
    let reseedModeCurrent = true;
    let displayFieldMode;
    let displayFieldModeCurrent = false;
    let modalButton;
    // let displayFieldModeCurrent = false;



    function Particle() {
        this.pos = p.createVector(p.floor(p.random(p.width)), p.floor(p.random(p.height)));
        this.vel = p.createVector(0, 0);
        this.acc = p.createVector(0, 0);
        this.maxspeed = 2;
        this.prevPos = this.pos.copy();
        this.steps = p.random(0, 100); // if i want the color of each particle to be different assign this random for each instance of one being created. // if not. then ommit. 
        this.diam = p.floor(p.random(1, 5));

        this.update = function () {
            this.vel.add(this.acc.mult(0.2));
            this.vel.limit(this.maxspeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

        this.applyForce = function (force) {
            this.acc.add(force);
        }

        this.show = function () {
            this.steps += p.random(0.0025, 0.01);
            var r = 255 * p.noise(this.steps + 1);
            var g = 255 * p.noise(this.steps + 3);
            var b = 255 * p.noise(this.steps + 5);
            switch (drawMode) {
                case 'ColorSize Variety': // white lines
                    //p.colorMode(p.RGB, r, g, b, 100);
                    p.stroke(r, g, b);
                    p.strokeWeight(this.diam);
                    p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    break;
                case 'White Flies': // white lines
                    p.colorMode(p.RGB, 255, 255, 255, 50);
                    p.stroke(255, 255, 255, 50);
                    p.strokeWeight(1);
                    p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    break;
                    // case 'Coloured Comets':
                    //   colorMode(RGB, 255, 255, 255, 100);
                    //   let blueV1 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 255, 0);
                    //   let redV1 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 0, 255);
                    //   stroke(redV1, 0, blueV1, 100);
                    //   strokeWeight(1);
                    //   line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    //   break;
                    // case 'Ghost Web':
                    //   colorMode(RGB, 255, 255, 255, 100);
                    //   stroke(255, 255, 255, 1);
                    //   strokeWeight(1);
                    //   line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    //   break;
                    // case 'Coloured Web':
                    //   colorMode(RGB, 255, 255, 255, 100);
                    //   let blueV2 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 255, 0);
                    //   let redV2 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 0, 255);
                    //   stroke(redV2, 0, blueV2, 1);
                    //   strokeWeight(1);
                    //   line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    //   break;
                default:
                    p.colorMode(p.RGB, r, g, b, 100);
                    p.stroke(r, g, b, 255);
                    strokeWeight(1);
                    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
            }
            // stroke(redV, 255, blueV, 100);

            // If using WEBGL context for P5 canvas...
            // lines not working, see https://github.com/processing/p5.js/issues/1638
            // so we use vertex() twice, instead.
            // However, this is twice as SLOW as non-WebGL context (13/01/2018)
            // push();
            // beginShape(LINES);
            // fill(255, 255, 255, 5);
            // vertex(this.pos.x - width / 2, this.pos.y - height / 2, 1);
            // vertex(this.prevPos.x - width / 2, this.prevPos.y - height / 2, 1);
            // endShape();
            // pop();

            this.updatePrev();
        }

        this.updatePrev = function () {
            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
        }

        this.edges = function () {
            if (this.pos.x > width) {
                this.pos.x = 0;
                this.updatePrev();
            }
            if (this.pos.x < 0) {
                this.pos.x = width;
                this.updatePrev();
            }
            if (this.pos.y > height) {
                this.pos.y = 0;
                this.updatePrev();
            }
            if (this.pos.y < 0) {
                this.pos.y = height;
                this.updatePrev();
            }
        }

        this.follow = function (vectors) {
            let x = p.floor(this.pos.x / scl);
            let y = p.floor(this.pos.y / scl);
            let index = x + y * cols; // taking 2D value into a 1D array
            let force = vectors[index];
            this.applyForce(force);
        }

    }




    class Sentences {
        constructor(x, y, diam, steps, word, incr) {
            this.x = x;
            this.y = y;
            this.diam = diam;
            this.steps = steps;
            this.opacity = 200;
            this.word = word
            this.speed = p.random(1, 5);
            this.direc = 1;
            this.inc = p.TWO_PI / 25.0; //p.TWO_PI / 10.0

        }
        display() {
            // this.y += this.speed * this.direc
            // var x = p.sin(p.width) * p.width / 4;
            p.mouseX += this.inc; //p.width / 2 * p.noise(this.steps) + this.x;
            //var y = p.height / 2 * p.noise(this.steps - 5) + this.y;
            p.noStroke()
            // to expedite testing i repaced the ellipses to texts but it should get it's own object
            // ellipse(x, y, this.diam, this.diam);
            p.textSize(this.diam)
            this.word ? p.text(this.word, this.x, this.y) : console.log('nothing'); //this is to cover when 'word is undefined'

        }
        update() {
            this.steps += p.random(0.0025, 0.01);
            var r = 255 * p.noise(this.steps);
            var g = 255 * p.noise(this.steps);
            var b = 255 * p.noise(this.steps);
            p.fill(r, g, b, this.opacity)
            // console.log('hello')
            // if (this.y > p.height) {
            //     this.direc = -1
            //     // this.diam -= 1
            //     this.speed /= 1.2
            // }
            // if (this.y < 0) {
            //     this.direc = 1
            //     // this.diam -= 1
            //     this.speed /= 1.2
            // }
        }

    }

    p.setup = function () {
        p.createCanvas(500, 500);
        p.background('white')
        ff = p.createGraphics(p.width, p.height);
        // p.textSize(this.diam)
        // p.fill('#333')
        // p.text('THIS IS A MOVEMENT PRACTICE \n PROPOSITION \n (It should take between 1 hour to 2 hours)', width / 4, height / 2)
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);
        numParticles = 500;
        seedParticles(numParticles);
        flowfield = new Array(cols * rows);
    };

    function seedParticles(num) {
        particles = [];
        for (let i = 0; i < num; i++) {
            particles[i] = new Particle();
        }
    }


    p.draw = function () {
        if (drawMode === "ColorSize Variety") {
            p.background(0); // draw solid background
        } else if (drawMode === "White Flies") {
            p.background(0); // draw solid background

        }
        //p.background('white');
        if (words) {
            for (let m = 0; m < words.length; m++) {
                words[m].display();
                words[m].update();
                // words[1].whiteOut()
            }
        }

        let yoff = 0;
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                let index = x + y * cols;
                let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
                let v = p5.Vector.fromAngle(angle);
                v.setMag(0.1);
                flowfield[index] = v;
                xoff += inc;
                if (displayFieldModeCurrent) {
                    push();
                    ff.stroke(200, 0, 0);
                    ff.strokeWeight(1);
                    ff.translate(x * scl, y * scl);
                    ff.rotate(v.heading());
                    ff.line(0, 0, scl, 0);
                    pop();
                    image(ff, 50, 50);
                }
            }
            yoff += inc;
        }
        zoff += 0.001;

        for (let i = 0; i < particles.length; i++) {
            particles[i].follow(flowfield);
            particles[i].update();
            particles[i].edges();
            particles[i].show();
        }

        // if (frameCount % 30 == 0) {
        //     fr.html("FPS: " + floor(frameRate()));
        // }


    };

    p.mousePressed = function () {

        drawMode === 'White Flies' ? drawMode = 'ColorSize Variety' : drawMode = 'White Flies'
        //seedParticles(500)
        //seedParticles(500) // key if i want to reseed and add more particles to place this here so it's not continually redrawing the seeding
        //below allows me to target only clicks within the canvas
        if (p.mouseY > 0 && p.mouseY < 500) {
            if (pageTwo[0]) {
                let newWord2 = new Sentences(10, p.mouseY, 12, 0, pageTwo[0]);
                words.push(newWord2)
                pageTwo.splice(0, 1);
            }
        }

    };
};

let sketch2 = new p5(prompt2);

// Compare to "global mode"
// let x = 100;
// let y = 100;

// function setup() {
//   createCanvas(200,200);
// }

// function draw() {
//   background(0);
//   fill(255);
//   ellipse(x,y,50,50);
// }