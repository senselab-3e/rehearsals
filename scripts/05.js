var notes;

//on each click i could add a thingy.... 


//NOTE --- i'm citing an array of texts for the emails called emailThreads from the cosmic digest js file, that is in another js file called cosmic digest. this is because potentially i want all that file information to be accessible to there sketch spaces. 
const gifVerse = ['gif404', 'gifmeowmix', 'gifpipecleaners', 'gifsponge', 'gifbreeze', 'giffold', 'gifshadows', 'gifsplash', 'gifsquee', 'gifsplat', 'gifumbrella', 'gifpoke', 'gifcompost', 'gifplanttrap', 'gif404', 'gifpinkwave', 'gifwave', 'gifducky'] // for each of these instances, a single pixel element will be created. 
const thingyVerse = ['staticSponge2', 'staticPingPong', 'staticBlueChair', 'staticPingPong', 'staticCompost', 'staticFishy', 'staticBlueBowl', 'staticSponge'] // for each of these instances, a single pixel element will be created. 
const linkVerse = ['portal-404s/rrr.html', 'portal-404s/fishy.html', 'portal-404s/sss.html', 'portal-404s/fff.html', 'portal-404s/aeo.html', 'portal-404s/vvv.html', 'portal-404s/kite.html', 'portal-404s/mmm.html', 'portal-404s/llli.html', 'portal-404s/eee.html', 'portal-404s/uuu.html', 'portal-404s/shsh.html', 'portal-404s/zzz.html', 'portal-404s/jardin.html', 'portal-404s/mondayfiles.html', 'portal-404s/bichos.html', 'portal-404s/gggrog.html', 'portal-404s/joy.html'] //creature.html



//PALETTE OBJ CONSTRuCTOR
function Palette(className, textStatus, imageStatus, randomColorNeeded) {
    this.className = className;
    //this.width = width;  //NOTE:seeabove. if assigned the css styling heirarchies will cause the :hover transitions in the sizing to not be applied. so it's necesary to leave them blank.
    //this.height = height;
    this.txtRq = textStatus; // checks for true of false for adding text within palette
    this.imgRq = imageStatus;
    this.colorReq = randomColorNeeded; //checks if this palette needs a random color assigned to it
    //NOTE: remember this currentHue thing in the future. right now the color for the palette is being decided by whatever is in palette Id palette1. for re-usability this will need to happen differently
    this.currentHue = function () {
        let sample = document.body.querySelector('#palette1') // just for testing purposes.
        //this is actually not to tricky. query Selector will choose the first instance, so even if i put palette instead of palette1, it will still grab hue information from the first palette, even if i don't reference it by a single id name
        let hsl = window.getComputedStyle(sample, null).getPropertyValue(
            "--hsl");
        return hsl
    }
    this.color = function () {
        if (this.colorReq) {
            let ranHexColor = getRandomColor();
            //this is awkward - but only in hsl mode can i check the lightness - so i'm first calling a random hex number, then converting to hsl. investigate a random HSL from the start, later
            let newhexColor = HEXtoHSL(ranHexColor);
            return 'hsl(' + newhexColor.h + ', ' + newhexColor.s + ', ' + newhexColor.l + ')';
        } else {
            return this.currentHue()
        }

    }


    this.createDiv = function () {
        //var paletteContainer = document.querySelector('.paletteContainer');
        var sliderContainer = document.querySelector('.sliderContainer');
        var palette = document.createElement('div');
        palette.className = this.className;
        //this.width ? palette.style.width = this.width : console.log('no width specified'); //NOTE:seeabove
        //this.height ? palette.style.height = this.height : console.log('no height specified');
        palette.style.left = 0;
        palette.style.top = 0;
        // palette.style.width = Math.ceil(Math.random() * 20) + 'vw';
        // console.log(this.color())
        palette.style.background = this.color();
        const colorPal = this.color();
        //console.log(palette, 'apple')
        // palette.style.cursor = 'pointer'; //doesn't seem to have made a difference
        this.txtRq === true ? this.textContent(palette, colorPal) : this.txtRq = this.txtRq;
        this.imgRq === true ? this.imageContent(palette) : this.imgRq = this.imgRq;






        palette.addEventListener("click", function (event) {
            palette.classList.contains('paletteOpen') ? palette.classList.remove('paletteOpen') : palette.classList.add('paletteOpen')

        })
        sliderContainer.appendChild(palette);

        //NOTE: THIS IS YOU WANT THE CONENT OF THE SLIDERS TO SLOWLY FADE IN 
        //since correcting the z-index issues, the visible edges issue i had before, is no longer an issue but this logic could be used for patches with images or other things

        // palette.addEventListener("mouseover", function (event) {
        //     palette.firstElementChild.classList.remove('hidden');
        //     palette.firstElementChild.classList.add('visible');
        // })
        // palette.addEventListener("mouseout", function (event) {
        //     palette.firstElementChild.classList.remove('visible');
        //     palette.firstElementChild.classList.add('hidden');
        // })


    }



    this.textContent = function (target, colorVal) {
        let text = ''
        const currentPalNum = document.body.querySelectorAll('.palette').length
        //validates that an array number of that index does exist
        emailThread[currentPalNum] ? text = emailThread[currentPalNum] : text = text;
        var textBox = document.createElement('div');
        textBox.className = 'textBox'; //this isn't entirely needed but could be use to specificy text styling
        // textBox.textContent = text;
        textBox.innerText = text;
        target.appendChild(textBox)

    }
    this.imageContent = function (target) {
        // console.log('images requested')
        var imageBox = document.createElement('div');
        imageBox.className = 'imagethingies';
        // const imageClassOptions = []
        // for (const key in gifVerseObj) {
        //     imageClassOptions.push(gifVerseObj[key].className)
        // }
        const currentPalNum = document.body.querySelectorAll('.palette').length
        // console.log(currentPalNum)
        imageBox.className = thingyVerse[currentPalNum];
        target.appendChild(imageBox);
    }

}





//NOTE: this is working in combination with flexbox. i can't rely on flexbox entirely for the effect i'm after but if it aint broke, don't fix it.
const resetPaletteWidth = (newWidth) => {
    sampleBlock = document.querySelector('#palette1');
    sampleBlock2 = document.querySelector('#palette2');
    const newWidthCube1 = newWidth + 'vw';
    const newWidthCube2 = 100 - newWidth + 'vw';
    sampleBlock.style.setProperty('width', newWidthCube1);
    sampleBlock2.style.setProperty('width', newWidthCube2);
}

const retreiveColor = (el) => {
    // console.log(el)
    let currentColorVal = window.getComputedStyle(el, null).getPropertyValue(
        "background");
    // console.log(currentColorVal, 'retrieve color');
    return currentColorVal;
}


const revealPixelPortal = () => {
    //const pixelContainer = document.querySelector('.pixelContainer');
    const pixelPortal = document.querySelectorAll('.pixelPatch'); // this number should be the same as the number of gifVerse
    //remember that i changed the iteration to start at 1, instead of 0, to exclude the first pixel from changing color or having a gif on it, because  i want the first pixel to remain consistently a pinkestpink anchor'
    for (let m = 0; m < pixelPortal.length - 1; m++) { // the last pixel has no accompanying class on rollover - it's purely there for the nudge

        pixelPortal[m].addEventListener("mouseover", function (event) {
            this.classList.add(gifVerse[m]);
            this.style.removeProperty('background'); //NOTE: see createPixel comments for details. but this became necessary because styling heirarchives for the dynamically assigned background color were causing the background images in the class i added to be overriden. removing that inline styline became necessary so that the class i and its image would be visible again. 
        });
        pixelPortal[m].addEventListener("mouseout", function (event) {
            this.classList.remove(gifVerse[m]);
            this.style.setProperty('background', getRandomColor());
        })
    }
}


const getClickPosition = (e) => {
    //var parentPosition = getPosition(e.currentTarget);
    const xPosition = e.clientX;
    //const yPosition = e.clientY;
    let intViewportWidth = window.innerWidth;
    //calculate position as 100 - value so i can use it like a percentage val but with vw css
    let percentageWidth = Math.floor(xPosition / intViewportWidth * 100)
    resetPaletteWidth(percentageWidth);
    //resetPixelLoc(xPosition, yPosition);
}

const addPaletteListener = () => {

    const palette1 = document.querySelector('#palette1');
    const palette2 = document.querySelector('#palette2');
    const mainPalettes = [palette1, palette2];
    mainPalettes.forEach(palette => {
        palette.addEventListener('click', function (e) {
            getClickPosition(e);
            creatSliderPalettes()
            // var newPalletes = new Palette('palette', true);
            // newPalletes.createDiv();
        })
    })

}

//i can still game the system to allow for the nudging effect by having the first and last pixel be elimated from gifverse loop so that they are just pink and indexable by the length of the element list

window.onload = () => {
    createPixelPatch() //container for pixels
    //this will be a dummy first pixel, purely for the nudgepixel function - which works when the first and last pixel is hit on a rollover
    // createPixel()
    for (let i = 0; i < gifVerse.length - 1; i++) {
        createPixel()
    }
    // createPixel()
    colorPicker() //initializizes color picker - which changes coloring of palette 1 and pixel 2
    //nudgePixels() // Temporatily disabling to add hover effects to pixels instead
    revealPixelPortal()
    addPaletteListener()
    addLinks()
    notes = document.querySelector('.pseudoCode'); // this is a global reference

    // const numVerses = []

    // for (const key in gifVerseObj) {
    //     numVerses.push(key)
    //     //console.log(gifVerseObj[key].className)
    // }
    //console.log(numVerses.length)

    for (text in emailThread) {
        creatSliderPalettes(true)
    }
}

const creatSliderPalettes = (colorcheck) => {

    const sliderContainer = document.querySelector('.sliderContainer');
    //this checks if the number of palettes being requested exceeds the number needed for text that needs placing within them.
    // if (sliderContainer.childElementCount < thingyVerse.length) {
    //     var newPalletes = new Palette('palette', true, true);
    //     newPalletes.createDiv();
    // } else {
    //     console.log('all thingies have a slider')
    // }
    var newPalletes = new Palette('palette', true, false, colorcheck);
    newPalletes.createDiv();
}

const createPixelPatch = () => {
    var pxlContainer = document.createElement('div');
    pxlContainer.className = 'pixelContainer';
    document.body.appendChild(pxlContainer);
}

const addLinks = () => {
    const linkList = document.querySelectorAll('.menuLinks');
    for (let i = 0; i < linkList.length; i++) {
        linkVerse[i] ? linkList[i].href = linkVerse[i] : linkVerse[i]; // checks if there is a valid index in the array of links in relation to the current index in the gifverses making up the pixel menu. if so, the a gets href. if not, nothing
    }
}

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const oranges = ['orange1', 'orange2', 'orange3', 'orange4'];


const createPixel = () => {
    const pixelContainer = document.querySelector('.pixelContainer'); // it doesn't seem like it's possible to grab the value of the colors being calculated from that css animation.... so i can't color the block with it, unfortunately
    var alink = document.createElement('a');
    alink.className = 'menuLinks';


    var patch = document.createElement('div');
    patch.className = 'pixelPatch';
    patch.style.background = getRandomColor() // NOTE: because the background color was dynamically assigned, it was overriding the css class based way in which i was adding a background image to appear, on a rollover. this is bc of the inline styling it injects. therefore i have had to do a removeProperty action to game that limitation, on the revealPortal function.

    alink.appendChild(patch);
    pixelContainer.appendChild(alink)
    pixelContainer.style.left = Math.random(window.innerWidth) * (window.innerWidth / 4 * 3) + 'px';
    pixelContainer.style.top = Math.random(window.innerHeight) * (window.innerHeight / 4 * 3) + 'px';
    //addListener(pixelContainer)
}

const replaceClassName = () => {
    notes.classList.contains('hide') ? notes.classList.remove('hide') : notes.classList.add('hide');
}

const setNewColorVal = (target) => {
    let currentH = window.getComputedStyle(target, null).getPropertyValue(
        "--h");
    let currentS = window.getComputedStyle(target, null).getPropertyValue(
        "--s");
    let currentL = window.getComputedStyle(target, null).getPropertyValue(
        "--l");
    currentH = parseInt(currentH);
    currentH < 360 ? currentH += 1 : currentH = 1; // this needs a conditional ceiling so that it cycles through
    updatedHue = currentH;
    const updatedHSL = 'hsl(' + updatedHue + ', ' + currentS + ', ' + currentL + ')'
    // NOTES: i need to set both the hue value and the overall hsl value in the css. i thought by updating just the hue val it would autimatically pass update the hsl in the css, but no. so i need these two css values passed to the function
    target.style.setProperty('--h', updatedHue);
    target.style.setProperty('--hsl', updatedHSL);
}

//currently disabled the color shifts on palette1
const updateColors = () => {
    const palette1 = document.querySelector('#palette1'); //NOTES: need to keep these here, rather then passing a variable through the function
    //const palette2 = document.querySelector('#palette2'); // i need to keep this function anonymous so that it can be used in a callback with setInterval, below
    setNewColorVal(palette1);
    //setNewColorVal(palette2);
}

var intervalChng = window.setInterval(updateColors, 1000); //continually changes color of palette2 element, using callback function 

const colorPicker = () => {
    const input = document.querySelector('input');
    input.addEventListener('change', function () {
        //console.log(input.value)
        const palette1 = document.querySelector('#palette1');
        const palette2 = document.querySelector('#palette2');
        let pixel = document.querySelectorAll('.pixelPatch');
        let convertedVal = HEXtoHSL(input.value) //NOTES: this now returning a  hsl information in an object with key values for each hsl
        // let currentH = window.getComputedStyle(target, null).getPropertyValue(
        //     "--h");
        // let currentS = window.getComputedStyle(target, null).getPropertyValue(
        //     "--s");
        // let currentL = window.getComputedStyle(target, null).getPropertyValue(
        //     "--l");


        const contrastH = window.getComputedStyle(palette1, null).getPropertyValue(
            "--h");
        const contrastS = window.getComputedStyle(palette1, null).getPropertyValue(
            "--s");
        const contrastL = window.getComputedStyle(palette1, null).getPropertyValue(
            "--l");
        //this passes whatever color palette 1 was, before a new color is applied from the picker, to palette 2. 
        palette2.style.setProperty('--h', contrastH);
        palette2.style.setProperty('--s', contrastS);
        palette2.style.setProperty('--l', contrastL);

        palette1.style.setProperty('--h', convertedVal.h);
        palette1.style.setProperty('--s', convertedVal.s);
        palette1.style.setProperty('--l', convertedVal.l);
        // palette2.style.setProperty('--h', convertedVal.h);
        // palette2.style.setProperty('--s', convertedVal.s);

        // const pixel2L = convertedVal.l.replace(/[^\w\d]/, '') - 10 + '%'; // this is a little overly complicated but i'm matching the second palette to the first palette, but just 10 degrees less light. becaue the object returned by the HEX conver t function includes the '%' symbol i have to remove it before subtracting. 
        // palette2.style.setProperty('--l', pixel2L);
        const hslString = 'hsl(' + convertedVal.h + ', ' + convertedVal.s + ', ' + convertedVal.l + ')';
        //const hslString2 = 'hsl(' + convertedVal.h + ', ' + convertedVal.s + ', ' + pixel2L + ')';
        const hslString2 = 'hsl(' + contrastH + ', ' + contrastS + ', ' + contrastL + ')';

        palette1.style.setProperty('--hsl', hslString);
        palette2.style.setProperty('--hsl', hslString2);
        colorShiftDif(convertedVal.h);
        colorShiftDif(convertedVal.h);
        //resetColorPixel(palette1, pixel[1]); //temporarily disabled this, because this overrides the class added to the pixels with a background gif image.
    })
}

//the core logic of this function was found here : https://www.html-code-generator.com/javascript/color-converter-script.php
//  I modified the end to export an object so i could grab h s l values separtely for my color scrolling purposes.
function HEXtoHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    //this is so that if a color is picked that is too dark for the black text to be read against, it goes a it lighter
    l < 60 ? l = 61 : l = l;
    l > 90 ? l = 89 : l = l;

    let colorHSL = {
        h: h,
        s: s + '%',
        l: l + '%'
    }
    return colorHSL
}

//NOTES: if i ever what to compare and contrast the former color value and new chosen color value and use that difference for something:
//NOTES: I changed this so it's calculated the color relation between palette 1 and 2, in terms of their hue numerical value. 
const colorShiftDif = (newVal) => {
    const palette2 = document.querySelector('#palette2')
    const contrastVal = window.getComputedStyle(palette2, null).getPropertyValue(
        "--h");
    //console.log(Math.abs(contrastVal - newVal))
}




function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    //console.log(array)
}

// this runs thorugh the current assembly of text in the palettes and then re-shuffles the array that fills the textcontent of those palettes

const checkList = () => {

    const list = document.querySelector('.sliderContainer')
    const textList = list.querySelectorAll('.textBox')

    shuffleArray(emailThread)

    for (let i = 0; i < textList.length; i++) {
        // const paletteColor = retreiveColor(textList[i]) //rbg()
        //const element = emailThread[i];
        if (emailThread[i]) {
            textList[i].textContent = emailThread[i]
            // textList[i].style.cssText = "--palette-height: " + textList[i].scrollHeight + "px";
            // textList[i].style.setProperty('height', 'var(--palette-height)')
            // textList[i].style.setProperty('background', paletteColor);
        }
    }
    paletteAdjust()
}

const paletteAdjust = () => {
    const textList = document.body.querySelectorAll('.palette')
    for (let i = 0; i < textList.length; i++) {
        const paletteColor = retreiveColor(textList[i])
        if (emailThread[i]) {
            textList[i].style.cssText = "--palette-height: " + textList[i].scrollHeight + "px";
            textList[i].style.setProperty('height', 'var(--palette-height)')
            textList[i].style.setProperty('background', paletteColor);
        }
    }
}

window.setTimeout(paletteAdjust, 1); // for some reason - i need to delay calling this -- perhaps because if called on first initialization - the dynamically created palettes don't all exist yet. this timer is an imperfect way of getting that list. 
// a lot of refactoring should be investigated for this stuff.. but i suspect getting the scroll Height - based on prior tests within the palette Constructor, can't be calculated at that moment of initialization.... the element has to already exist in the space. but this is kind of super messy : P 