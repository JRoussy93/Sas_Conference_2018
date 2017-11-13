/* eslint-env browser */ //Removes annoying errors in ESLint (Brackets)

/*------- VARIABLES --------*/

//Get Element by ID shortcut
var getID = function (id) {
    return document.getElementById(id);
};

// window scroll position
var latestKnownScrollY = 0;

//Is the animation already updating?
var ticking = false;

//Array containing all the shape IDs
var shapes = [getID('square1holder')];
var initialpos



/*----------------------Optimisations-------------------------*/

/* ----TAKEN FROM RELLAX, more efficient animation for smoother results*/
// check what requestAnimationFrame to use, and if
// it's not supported, use the onscroll event
var loop = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        setTimeout(callback, 1000 / 60);
    };

/* ----TAKEN FROM RELLAX, adds vendor prefixes)*/
// check which transform property to use 
var transformProp = window.transformProp || (function () {
    var testEl = document.createElement('div');
    if (testEl.style.transform == null) {
        var vendors = ['Webkit', 'Moz', 'ms'];
        for (var vendor in vendors) {
            if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
                return vendors[vendor] + 'Transform';
            }
        }
    }
    return 'transform';
})();




/*------Main functions-------------*/


//Gets element's rotation angle. (source: CSS Tricks)
//Keeping this to potentially pause and restart the shapes' rotating animation.
function getAngle(el) {
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";


    // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a * a + b * b);


    // arc sin, convert from radians to degrees, round
    var sin = b / scale;
    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI) * 100) / 100; //Added the (*100)/100 to keep some decimals 

    return angle;
}

//Sets the latestKnownScrollY variable to the latest scroll position, then calls for animation
function onScroll() {
    latestKnownScrollY = window.pageYOffset; // using pageYOffset because scrollY is not supported by IE
    requestTick();
}


//Checks to see if an animation request is already ongoing, otherwise requests a frame update
function requestTick() {
    if (!ticking) {
        loop(update);
    }
    ticking = true;
}

//The main function. Moves stuff around according to the scrolling position
function update() {
    // reset the tick so we can capture the next onScroll
    ticking = false;

    //var currentScrollY = latestKnownScrollY;
    var windowHeight = window.innerHeight;
    
    //selects shapes one by one and does stuff to them or not
    for(var i=0; i<shapes.length; i++){
        var shape = shapes[i];
        var rect = shape.getBoundingClientRect(); // gets the element's position in the window
        var top = rect.top; //gets element's distance from top of window
        
        if(top <= windowHeight && top >= windowHeight / 3){
            shape.style.left = top - windowHeight/3 + 'px';
        }
    }
    
}


//Listens for any scrolling on the screen, then calls the onScroll function.
window.addEventListener('scroll', onScroll, false);


/*
Using animation optimizations taken from Rellax.js and https://www.html5rocks.com/en/tutorials/speed/animations/
*/
