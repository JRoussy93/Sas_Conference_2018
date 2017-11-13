
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


//Sets the latestKnownScrollY variable to the latest scroll position, then calls for animation
function onScroll() {
    latestKnownScrollY = window.pageYOffset; // using pageYOffset because scrollY is not supported by IE
    requestTick();
}


//Checks to see if an animation request is already ongoing, otherwise requests a frame update
function requestTick(){
    if(!ticking){
        loop(update);
    }
    ticking = true;
}

//The main function. Moves stuff around according to the scrolling position
function update() {
    // reset the tick so we can
	// capture the next onScroll
    ticking = false;
    
    var currentScrollY = latestKnownScrollY;
    
    //getID('square1').innerHTML = currentScrollY;
}


//Listens for any scrolling on the screen, then calls the onScroll function.
window.addEventListener('scroll', onScroll, false);


/*
Using animation optimizations taken from Rellax.js and https://www.html5rocks.com/en/tutorials/speed/animations/
*/
