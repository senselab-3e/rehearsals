let drawMode = "cluster";

var prompt1 = function (p) {
    let x = 100;
    let y = 100;
    let words = [];
    let introWords = [];

    //NOTE. added a weird '.' because i wanted there to be a pause before the next sentence's What is printed
    const introText =
        "What is it to move with a proposition? What does that do differently?";
    let arrayIntroText = introText.split(" ");

    function checkMode() {
        switch (drawMode) {
            case "single":
                drawMode = "cluster";
                break;
            case "cluster":
                drawMode = "smear";
                break;
            case "smear":
                drawMode = "cluster";
                seedWords(); // this reseeds the whole sentence so it's not just adding the words on loop. BUT. that is a creative decision only. it could be interesting to have them multiply.
                break;
            default:
                drawMode = "single";
                break;
        }
    }

    const seedWords = () => {
        words = [];
        arrayIntroText.forEach((word) => {
            //because this is grabbing the same mouseX mouseY all at the same moment - when it reseeds, it creates the sentence in a cluster
            let wordEl = new Sentences(p.width / 2, p.height / 2, 5, 0, word);
            words.push(wordEl);
        });
    };

    class Sentences {
        constructor(x, y, diam, steps, word) {
            this.x = x;
            this.y = y;
            this.diam = diam;
            this.steps = steps; //p.random(115);
            this.opacity = 255;
            this.word = word;
            this.stroke = "black";
        }
        display() {
            // console.log(this.steps)
            if (drawMode === "single") {
                var x = (p.width / 4) * p.noise(0); //if i replace the noise property with noise(0) instead of noise(this.steps) i get a verticality in the movements on the Y
                var y = p.height * p.noise(this.steps);
            } else if (drawMode === "cluster") {
                var x = (p.width / 2) * p.noise(this.steps);
                var y = this.y * p.noise(this.steps + 5);
            } else {
                var x = (p.width / 2) * p.noise(this.steps);
                var y = this.y * p.noise(this.steps + 5);
            }
            p.noStroke();
            p.textSize(27);
            this.word ? p.text(this.word, x, y) : (this.word = ""); //this is to cover when 'word is undefined'
            // text(this.word, x, y)
        }
        update() {
            this.steps += p.random(0.0025, 0.01);
            var r = 255 * p.noise(this.steps + 1);
            var g = 255 * p.noise(this.steps + 3);
            var b = 255 * p.noise(this.steps + 5);
            p.fill(r, g, b, this.opacity);
        }
    }

    p.setup = function () {
        p.createCanvas(500, 500);
        p.background("white");
        seedWords();
        // p.textSize(17)
        // p.fill('#333')
        // p.text('THIS IS A MOVEMENT PRACTICE \n PROPOSITION \n (It should take between 1 hour to 2 hours)', width / 4, height / 2)
    };

    p.draw = function () {
        if (drawMode === "single") {
            p.background("white");
            // p.push()
            // p.textSize(17)
            // p.fill('#333')
            // p.text('THIS IS A MOVEMENT PRACTICE \n PROPOSITION \n (It should take between 1 hour to 2 hours)', width / 4, height / 2)
            // p.pop()
        } else if (drawMode === "smear") {
            //no background color is being applied so that the words now smear
        } else if (drawMode === "cluster") {
            p.background("white");
        } else {
            console.log("unknown mode");
        }

        if (words) {
            for (let m = 0; m < words.length; m++) {
                words[m].display();
                words[m].update();
            }
        }
        //gives the canvas and outline
        p.push();
        p.noFill();
        p.stroke("#333");
        p.rect(0, 0, p.width, p.height);
        p.pop();
    };

    p.mousePressed = function () {
        //it's possible to target a specific canvas by calculating the x/y position relative to the distance of the two canvas instances combined. so if mouseY > 500, for example
        //(mouseY > 500) ? console.log('second canvas', mouseY): console.log('first canvas', mouseY)

        if (p.mouseY > 0 && p.mouseY < p.height && p.mouseX < p.width) {
            console.log(true);
            if (arrayIntroText.length > 0) {
                let introWord = new Sentences(
                    p.mouseX,
                    p.mouseY,
                    5,
                    0,
                    arrayIntroText[0]
                );
                words.push(introWord);
                //this is set to switch modes when the word proposition is hit in the text string. it will move things from single mode to cluster
                //relying on a number is not the best....
                //I originally introduced a mode shift between single to cluster, between sentence one and two of the string. but then decided it was more effective to start from the cluster
                // if (words.length === 9) {
                //     checkMode()
                // }
            } else {
                console.log("out of words");
                arrayIntroText = introText.split(" ");
                //this is set to trigger a switch mode from cluster to smear - once all the words in the text string have been printed
                checkMode();
                let introWord = new Sentences(
                    p.mouseX,
                    p.mouseY,
                    5,
                    0,
                    arrayIntroText[0]
                );
                words.push(introWord);
            }
            //each time the mouse is clicked, it empties out the first element in the array of text. this lets me print the 'next' word in the string source. the array is reset and refilled with the whole string, once it hits a length of zero.
            arrayIntroText.splice(0, 1);
        } else {}
    };
};

var prompt3 = function (p) {
    // p could be any variable name
    let patches = [];

    let text = [
        "TOOLS: \n\n - [ ] a colour patch to create a zone of intensity of colorality\n to hold and suspend a region of contrast as a way\n to modulate the field for engagement into an occassioning\n of experience moving this way this time.\n \t- ,",
        "[ ] a bag to fill with water. preferably warm and cold water to experiment with different temperature as contrasts.\n \t- [ ] one or two pieces of fabric with interesting colour and texture or that carry sparks for an affinity of tonality with the capacity to lure a RELATION DIAGRAM: every movement proposition should take around 15-20 minutes but feel free to shorten and//or expand but keep it time limited so that it finds itself in THIS way, THIS time.",
    ];

    const colorArrays = [
        [68, 173, 228, 200],
        [43, 86, 185, 200],
        // [255, 69, 30, 200],
        [255, 193, 43, 200],
    ];

    class Modulator {
        constructor(x, y, diam, steps) {
            this.x = x;
            this.y = y;
            this.diam = diam;
            this.steps = steps;
            this.opacity = 102;
            this.r = p.random(255);
            this.g = p.random(255);
            this.b = p.random(255);
            this.color = p.random(colorArrays);
        }
        display() {
            //console.log(p.mouseX, 'origin')
            //console.log(p.mouseX * p.noise(this.steps + p.random(1, 15)), 'noise');
            // var x = p.mouseX + p.mouseX * p.noise(this.steps + p.random(0, 10));
            // var y = p.mouseY + p.mouseY * p.noise(this.steps + p.random(0, 10));
            // var x = p.mouseX * p.noise(this.steps + p.random(1, 5)) * 2;
            // var y = p.mouseY * p.noise(this.steps + p.random(1, 5)) * 2;
            // var x = p.mouseX * p.noise(this.steps + 1) * 2; /// multiplied it by 2 to get it back to closer to the
            // var y = p.mouseY * p.noise(this.steps + 3) * 2;
            var x = p.mouseX * p.noise(this.steps + 1) * 2; /// multiplied it by 2 to get it back to closer to the
            var y = p.mouseY * p.noise(this.steps + 3) * 2;
            // var r = p.random(255) //255 * p.noise(this.steps);
            // var g = p.random(255) //255 * p.noise(this.steps);
            // var b = p.random(255) //255 * p.noise(this.steps);
            //console.log(x, 'noise')

            p.noStroke();
            //p.fill(this.r, this.g, this.b);
            p.fill(this.color);
            //p.ellipse(x, y, this.diam, this.diam);
            p.rect(x, y, 5, 500);
        }
        update() {
            this.steps += 0.001;
        }
    }

    class Pinwheel {
        constructor(x, y) {
            // this.v = p5.Vector.random2D()
            this.v = p.createVector(x, y, 0.0);
            //this.prevV = this.v.copy()
            this.color = [255, 120, 43]; //[255, 69, 30, 200]; //p.random(colorArrays);
            // this.blurAmt = incr
            // this.prevV = this.v.copy()
            this.size = p.random(100, 250);
            // x ? this.v.x = x : this.v = p5.Vector.random2D()
            // y ? this.y = y : this.y = p.random(p.height);
            this.steps = 0;
            this.x = this.v.x; //x - x / 2 // I'm doing this because i want the square drawn from the middle of where the cursor clicks, not the top right.
            this.y = this.v.y; //y - y / 2
        }

        update() {}
        show() {
            p.push();
            p.fill(this.color);
            p.noStroke();
            p.rect(this.x, this.y, this.size); //p.
            p.pop();
        }
    }

    let mods = [];
    let numMods = 5;
    p.setup = function () {
        p.createCanvas(500, 500);
        p.background("white");
        p.textSize(17);
        //p.text(text[0], 10, p.height / 6)
        for (let o = 0; o < numMods; o++) {
            let newMod = new Modulator(p.mouseX, p.mouseY, 15, p.random(0, 5));
            mods.push(newMod);
        }
    };

    p.draw = function () {
        patches.forEach((patch) => {
            patch.update();
            patch.show();
        });
        for (let m = 0; m < mods.length; m++) {
            mods[m].display();
            mods[m].update();
        }
        p.push();
        p.fill("white");
        p.noStroke();
        p.textSize(17);
        p.text(text[0], 30, p.height / 6);
        p.pop();
    };

    p.mousePressed = function () {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY < p.height) {
            let patch = new Pinwheel(p.mouseX, p.mouseY);
            patches.push(patch);
            // p.translate(p.width / 2, p.height / 2)
            // p.rotate(p.random(20))
            // p.textSize(14)
            // p.text(text[0], 10, p.height / 6)

            //if the values going into the constructor are always the same, it's drawing 5 instances of the ellipse on top of each other, while spinning around. //that's why i have a p.random value going in for the steps
            // for however many iterations i'm moving through, i need to have that many instances in the p.random - unlleesss i want some of the particles to share the same pathways as others.
        }
    };
};

// Sketch Two
var prompt2 = function (p) {

    circles = [] // container for purple mousemove disappear elements 

    class Circle {
        constructor(x, y, diam, steps) {
            this.x = x;
            this.y = y;
            this.diam = diam;
            this.steps = steps;
            this.opacity = 102;
        }
        display() {
            let c = p.color(15, 26, 102, this.opacity);
            //the fourth value is the alpha /// it can be extracted by passing c in to p.alph(c)
            p.noStroke()
            p.fill(c)
            p.ellipse(this.x, this.y + this.steps, this.diam, this.diam);
        }
        update() {
            if (this.diam < 250) {
                this.diam += 1;
            }
            if (this.opacity >= 0) {
                this.opacity -= 1;
            }
        }
        check4removal(i) {
            if (this.opacity === 0) {
                circles.splice(i, 1)
            }
        }
    }

    //offset amounts for wobble circle
    var yoff = 0.0;

    p.setup = function () {
        p.createCanvas(500, 500);
        p.background("purple");
    };
    //color values
    const c = {
        r: p.random(p.random(255)),
        g: p.random(p.random(255)),
        b: p.random(p.random(255)),
    }

    p.draw = function () {

        p.background("purple");

        //wobble circle
        p.push()
        p.noStroke()
        p.translate(p.width / 2, p.height / 2);
        var radius = p.width / 3 + 50;

        //wobble based off of https://youtu.be/Cl_Gjj80gPE
        p.beginShape();
        p.fill(c.r, c.g, c.b, 200)
        var xoff = 0;
        for (var a = 0; a < p.TWO_PI; a += 0.1) {
            var offset = p.map(p.noise(xoff, yoff), 0, 1, -25, 25);
            var r = radius + offset;
            var x = r * p.cos(a);
            var y = r * p.sin(a);
            p.vertex(x, y);
            xoff += 0.1;
        }
        p.endShape(p.CLOSE);

        yoff += 0.01;
        p.pop()

        p.push();
        p.fill("white");
        p.textSize(18);
        // p.textStyle(BOLD);
        p.textAlign(p.CENTER);
        p.text(
            "THIS IS A MOVEMENT PRACTICE \nPROPOSITION \n\n",
            p.width / 2,
            p.height / 3
        );
        p.pop();

        p.push();
        p.fill("#eee");
        p.textSize(14);
        p.text(
            "It should take between 1 hour to 2 hours \n\n\nIt is a STUDY time, so it will require TENDING time.",
            p.width / 6,
            p.height / 2
        );


        for (let m = 0; m < circles.length; m++) {

            circles[m].display();
            circles[m].update();
            circles[m].check4removal(m);

        }

        //let newCirc = new Circle(p.mouseX + p.random(1, 5), p.mouseY + p.random(1, 5), 5, 1);
        //let newCirc2 = new Circle(p.mouseX, p.mouseY, 20, 30);
        circles.push(new Circle(p.mouseX + p.random(15), p.mouseY + p.random(1, 15), 5, 1));
    };

    p.mouseDragged = function () {
        yoff -= 0.05
    }
    p.mousePressed = function () {

        if (p.mouseX > 0 &&
            p.mouseX < p.width &&
            p.mouseY < p.height &&
            p.mouseY > 0) {
            c.r = p.floor(p.random(255))
            c.g = p.floor(p.random(255))
            c.b = p.floor(p.random(255))
        }
    };


};

var h = function (p) {
    // p could be any variable name
    var x = 100;
    var y = 100;
    p.setup = function () {
        p.createCanvas(400, 200);
    };

    p.draw = function () {
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);
    };
};

// var prompt5 = function (p) {
//   class Metaball {
//     constructor() {
//       const size = Math.pow(Math.random(), 2);
//       //originally this was a much faster velocity
//       //this.vel = p5.Vector.random2D().mult(8 * (1 - size) + 2);
//       this.vel = p5.Vector.random2D().mult(1 * (1 - size) + 1);
//       this.radius = 30 * size + 40; // this allows for a minimum size. so no matter what it won't go less then 20.

//       this.pos = new p5.Vector(p.mouseX, p.height / 2);
//     }

//     update() {
//       this.pos.add(this.vel);

//       if (this.pos.x < this.radius || this.pos.x > p.width - this.radius)
//         this.vel.x *= -1;
//       if (this.pos.y < this.radius || this.pos.y > p.height - this.radius)
//         this.vel.y *= -1;
//     }
//   }

//   let metaballShader;

//   //the num of balls needs to be updated in the shader.js as well
//   let N_balls = 1;
//   metaballs = [];
//   // followBalls = []

//   p.preload = function () {
//     metaballShader = getShader(this._renderer);
//     myFont = p.loadFont("scripts/OpenSans-B9K8.ttf");
//   };

//   p.setup = function () {
//     p.createCanvas(500, 500, p.WEBGL);

//     p.shader(metaballShader);
//     //metaballs.push(new Metaball())
//     // for (let i = 0; i < N_balls; i++) metaballs.push(new Metaball());
//     // followBalls.push(new FollowBall())
//   };

//   p.draw = function () {
//     var data = [];
//     metaballShader.setUniform("followballs", data);

//     for (const ball of metaballs) {
//       ball.update();
//       data.push(ball.pos.x, ball.pos.y, ball.radius);
//     }
//     metaballShader.setUniform("metaballs", data);
//     p.rect(0, 0, p.width, p.height);
//     // need to load font in WEBGL mode
//   };

//   p.mouseWheel = function () {
//     // This stops the canvas from scrolling by a few pixels.
//     return false;
//   };

//   p.mousePressed = function () {
//     // console.log(metaballs.length)
//     //let newBall = new Metaball()
//     metaballs.push(new Metaball());
//   };
// };


var prompt6 = function (p) {
    //The Wizard Bear CC-BY-SA 2019 https://www.openprocessing.org/sketch/713379

    var string = "MOVEMENT PROPOSITION #1: FLUIDS"; //words to be displayed intially
    //var string2 = ["MOVEMENT", "PROPOSITION", "#1: FLUIDS"];

    const size = 20; //font size
    const fontFile = "scripts/OpenSans-B9K8.ttf";
    const showText = true; //whether or not to have an overlay of the original text (in the background color)
    const textAlpha = 0.1; //the alpha of the text if displayed (low value will make it slowly fade in)
    const backgroundColor = 8; //kinda self-explanatory
    const strokeAlpha = 200; //the alpha of the lines (lower numbers are more transparent)
    const strokeColor = 155; //the line color

    const fontSampleFactor = 0.5; //How many points there are: the higher the number, the closer together they are (more detail)

    const noiseZoom = 0.006; //how zoomed in the perlin noise is
    const noiseOctaves = 4; //The number of octaves for the noise
    const noiseFalloff = 0.5; //The falloff for the noise layers

    const zOffsetChange = 0; //How much the noise field changes in the z direction each frame
    const individualZOffset = 0; //how far away the points/lines are from each other in the z noise axies (the bigger the number, the more chaotic)

    const lineSpeed = 1; //the maximum amount each point can move each frame

    const newPointsCount = 9; //the number of new points added when the mouse is dragged

    var seed;
    var font;
    var points = [];
    var startingPoints;

    p.preload = function () {
        font = p.loadFont(fontFile);
    };

    p.setup = function () {
        p.createCanvas(500, 500);
        // p.background('black')
        p.textFont(font);
        p.fill(backgroundColor, textAlpha);
        p.strokeWeight(0.6);
        p.stroke(83, 155, 20, strokeAlpha);
        p.noiseDetail(noiseOctaves, noiseFalloff);
        seed = p.floor(p.random(1000));

        p.start();
        //console.log(p.random())
    };

    p.start = function () {
        p.background(backgroundColor);
        p.textSize(size);

        p.randomSeed(seed);
        p.noiseSeed(seed);
        frameCount = 0;

        // startingPoints = font.textToPoints(string, p.width / 2 - p.textWidth(string) / 2, p.height / 2, size, {
        //     "sampleFactor": fontSampleFactor
        // });

        //for (let a = 0; a < string2.length; a++) {
        startingPoints = font.textToPoints(
            string,
            p.width / 2 - p.textWidth(string) / 2,
            p.height / 2,
            size, {
                sampleFactor: fontSampleFactor,
            }
        );

        //}

        points = [];
        for (let n = 0; n < startingPoints.length; n++) {
            // let ran = p.random(0, 1);
            points[n] = startingPoints[n];
            points[n].zOffset = p.random(0, 1);
            //console.log(retrRan())
        }
    };

    const currentColor = {
        r: 163,
        g: 55,
        b: 30,
        alpha: strokeAlpha,
    };

    p.draw = function () {
        p.stroke(
            currentColor.r,
            currentColor.g,
            currentColor.b,
            currentColor.alpha
        );
        if (showText) {
            //p.stroke(currentColor.r, currentColor.g, currentColor.b, currentColor.alpha)
            // p.push() // introduce this if you don't want the text outline the whole time
            // p.noStroke();
            //p.stroke(33, 155, 200, strokeAlpha);
            p.text(string, p.width / 2 - p.textWidth(string) / 2, p.height / 2);

            //p.pop()
            //p.stroke(p.random(255), p.random(255), p.random(255))
        }
        for (let pt = 0; pt < points.length; pt++) {
            let b = points[pt];
            let noiseX = b.x * noiseZoom;
            let noiseY = b.y * noiseZoom;
            let noiseZ = frameCount * zOffsetChange + b.zOffset * individualZOffset;
            //console.log(noiseRan(noiseX, noiseY, noiseZ))
            let newPX =
                b.x +
                p.map(p.noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
            let newPY =
                b.y +
                p.map(
                    p.noise(noiseX, noiseY, noiseZ + 214),
                    0,
                    1,
                    -lineSpeed,
                    lineSpeed
                );
            //console.log(b.x, b.y, newPX, newPY)

            p.line(b.x, b.y, newPX, newPY);

            b.x = newPX;
            b.y = newPY;
        }
    };

    p.mouseDragged = function () {
        for (let i = 0; i < newPointsCount; i++) {
            let angle = p.random(p.TAU);
            let magnitude = p.randomGaussian() * ((newPointsCount - 1) ** 0.5 * 3);
            let newPoint = {
                x: p.mouseX + magnitude * p.cos(angle),
                y: p.mouseY + magnitude * p.sin(angle),
                zOffset: p.random(),
            };
            points[points.length] = newPoint;
            startingPoints[startingPoints.length] = newPoint;
        }
    };

    p.mousePressed = function () {
        console.log("clicking");
        currentColor.r = p.random(100, 200);
        currentColor.g = p.random(10, 50);
        currentColor.b = p.random(50, 255);
    };
};

var promptflies = function (p) {
    let x = 100;
    let y = 100;
    let words = [];
    const pageTwo = [
        "It is a STUDY time, so it will require TENDING time.",
        "As a proposition it also carries the quality\n of being a GIFT. \n \nAs a gift it also carries the appetite\n to generate gestures of FEED-back to the process \n and FEEDING-forward.\n\n But we don't know in advance what feeding forward\n and feeding back is. we generate it in and with\n the practice!\n",
        "FIGURE: the cell as process\n TOOLS: \n \t- [ ] a colour patch to create a zone of intensity of colorality\n to hold and suspend a region of contrast as a way\n to modulate the field for engagement into an occassioning\n of experience moving this way this time.\n \t- [ ] a bag to fill with water. preferably warm and cold water to experiment with different temperature as contrasts.\n \t- [ ] one or two pieces of fabric with interesting colour and texture or that carry sparks for an affinity of tonality with the capacity to lure a RELATION DIAGRAM: every movement proposition should take around 15-20 minutes but feel free to shorten and//or expand but keep it time limited so that it finds itself in THIS way, THIS time.",
    ];

    const introText =
        "What is it to move with a proposition? What does that do differently?";
    let arrayIntroText = introText.split(" ");

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
        this.pos = p.createVector(
            p.floor(p.random(p.width)),
            p.floor(p.random(p.height))
        );
        this.vel = p.createVector(0, 0);
        this.acc = p.createVector(0, 0);
        this.maxspeed = 4;
        this.prevPos = this.pos.copy();
        this.steps = p.random(0, 100); // if i want the color of each particle to be different assign this random for each instance of one being created. // if not. then ommit.
        this.diam = p.floor(p.random(1, 15));

        this.update = function () {
            this.vel.add(this.acc.mult(0.3));
            this.vel.limit(this.maxspeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
        };

        this.applyForce = function (force) {
            this.acc.add(force);
        };

        this.show = function () {
            this.steps += p.random(0.0025, 0.01);
            var r = 255 * p.noise(this.steps + 1);
            var g = 255 * p.noise(this.steps + 3);
            var b = 255 * p.noise(this.steps + 5);
            switch (drawMode) {
                case "ColorSize Variety": // white lines
                    //p.colorMode(p.RGB, r, g, b, 100);
                    p.stroke(r, g, b);
                    p.strokeWeight(this.diam);
                    p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    p.fill("black");
                    break;
                case "White Flies": // white lines
                    p.colorMode(p.RGB, 255, 255, 255, 50);
                    p.stroke(255, 255, 255, 50);
                    p.strokeWeight(1);
                    p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    p.fill("black");
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
                case "Coloured Web":
                    p.colorMode(p.RGB, 255, 255, 255, 100);
                    let blueV2 = p.map(
                        this.vel.x + this.vel.y,
                        0,
                        this.maxspeed * 2,
                        255,
                        0
                    );
                    let redV2 = p.map(
                        this.vel.x + this.vel.y,
                        0,
                        this.maxspeed * 2,
                        0,
                        255
                    );
                    let greenV2 = p.map(
                        this.vel.x + this.vel.y,
                        this.maxspeed * 2,
                        255,
                        255,
                        0
                    );
                    p.stroke(redV2, greenV2, blueV2, 10);
                    p.strokeWeight(10);
                    p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                    p.fill("black");
                    break;
                default:
                    p.colorMode(p.RGB, r, g, b, 100);
                    p.stroke(r, g, b, 255);
                    p.strokeWeight(1);
                    p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
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
        };

        this.updatePrev = function () {
            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
        };

        this.edges = function () {
            if (this.pos.x > p.width) {
                this.pos.x = 0;
                this.updatePrev();
            }
            if (this.pos.x < 0) {
                this.pos.x = p.width;
                this.updatePrev();
            }
            if (this.pos.y > p.height) {
                this.pos.y = 0;
                this.updatePrev();
            }
            if (this.pos.y < 0) {
                this.pos.y = p.height;
                this.updatePrev();
            }
        };

        this.follow = function (vectors) {
            let x = p.floor(this.pos.x / scl);
            let y = p.floor(this.pos.y / scl);
            let index = x + y * cols; // taking 2D value into a 1D array
            let force = vectors[index];
            this.applyForce(force);
        };
    }

    class Sentences {
        constructor(x, y, diam, steps, word, incr) {
            this.x = x;
            this.y = y;
            this.diam = diam;
            this.steps = steps;
            this.opacity = 200;
            this.word = word;
            this.speed = p.random(1, 5);
            this.direc = 1;
            this.inc = p.TWO_PI / 25.0; //p.TWO_PI / 10.0
        }
        display() {
            // this.y += this.speed * this.direc
            // var x = p.sin(p.width) * p.width / 4;
            p.mouseX += this.inc; //p.width / 2 * p.noise(this.steps) + this.x;
            //var y = p.height / 2 * p.noise(this.steps - 5) + this.y;
            p.noStroke();
            // to expedite testing i repaced the ellipses to texts but it should get it's own object
            // ellipse(x, y, this.diam, this.diam);

            p.textSize(this.diam);
            //p.translate(width / 2, 0);
            // p.textAlign(p.CENTER)
            this.word ? p.text(this.word, this.x, this.y) : console.log("nothing"); //this is to cover when 'word is undefined'
        }
        update() {
            this.steps += p.random(0.0025, 0.01);
            var r = 255 * p.noise(this.steps);
            var g = 255 * p.noise(this.steps);
            var b = 255 * p.noise(this.steps);
            p.fill(r, g, b, this.opacity);
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
        p.background("white");
        ff = p.createGraphics(p.width, p.height);
        // p.textSize(this.diam)
        // p.fill('#333')
        // p.text('THIS IS A MOVEMENT PRACTICE \n PROPOSITION \n (It should take between 1 hour to 2 hours)', width / 4, height / 2)
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);
        numParticles = 500;
        seedParticles(numParticles);
        flowfield = new Array(cols * rows);
        let newWord2 = new Sentences(p.width / 9, p.height / 6, 17, 0, pageTwo[1]);
        words.push(newWord2);
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
        } else if (drawMode == "Coloured Web") {
            //no background drawn so the smearing drawing can happen
        }

        //text prompts
        // p.push();
        // p.fill("white");

        // p.pop();

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
        p.noStroke();
        p.textSize(19);
        p.text(pageTwo[1], p.width / 10, p.height / 6);
    };

    p.mousePressed = function () {
        //condition check for mouse Clicks within the canvas area only - not a click just anywhere.
        if (
            p.mouseX > 0 &&
            p.mouseX < p.width &&
            p.mouseY < p.height &&
            p.mouseY > 0
        ) {
            // drawMode === "White Flies"
            //   ? (drawMode = "ColorSize Variety")
            //   : (drawMode = "White Flies");

            switch (drawMode) {
                case "ColorSize Variety":
                    drawMode = "White Flies";
                    break;
                case "White Flies":
                    drawMode = "Coloured Web";
                    break;
                case "Coloured Web":
                    drawMode = "ColorSize Variety";
                    //seedParticles(numParticles);
                    break;
                default:
                    drawMode = "ColorSize Variety";
                    break;
            }
        }
        //seedParticles(500)
        //seedParticles(500) // key if i want to reseed and add more particles to place this here so it's not continually redrawing the seeding
        //below allows me to target only clicks within the canvas
        // if (p.mouseY > 0 && p.mouseY < 500) {
        //   // if (pageTwo[0]) {
        //   //     let newWord2 = new Sentences(10, p.mouseY, 12, 0, pageTwo[0]);
        //   //     words.push(newWord2)
        //   //     pageTwo.splice(0, 1);
        //   // }
        // }
    };
};

// var myp4 = new p5(prompt5, 'c4');
var myp1 = new p5(prompt1, "c1");
var myp2 = new p5(prompt2, "c2");
var myp3 = new p5(prompt3, "c3");
var my6 = new p5(prompt6, "c6");
//var myp5 = new p5(prompt5, "c5"); // something buggy with this one - when it's loaded scrolling the window disappears///
var myp5 = new p5(promptflies, "c5");