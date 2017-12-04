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

//Variables for previous menu handling
//var main_menu = getID('main_menu');
//var menuOrigin = getPosition(main_menu);
//var fixed_menu = false;

/**
 * Generate initial array with elements as objects
 * This array will be extended later with elements attributes values
 * like 'position'
 */
function createArrayWithElements(className) {
    var elements = document.getElementsByClassName(className);
    let finalElements = [];

  [].forEach.call(elements, function (el, i) {
        finalElements.push({
            node: el,
            visible: false
        });
    });

    return finalElements;
};

var objects = createArrayWithElements('animate');




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

//Calculates distance of element from top of document, looping through its parent elements
//NOT NEEDED IF NOT USING FIXED MENU
//function getPosition(element) {
//    var yPosition = 0;
//
//    while (element) {
//        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
//        element = element.offsetParent;
//    }
//
//    return yPosition;
//}

//Easing functions
// t: current time, b: begInnIng value, c: change In value, d: duration
function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}

function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}


/*------Main functions-------------*/

//Adds the .out class to all elements to be animated.
function initializeAnim() {
    for (var i = 0; i < objects.length; i++) {
        objects[i].node.classList.add("out");
    }
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

    var currentScrollY = latestKnownScrollY;
    var windowHeight = window.innerHeight;


    //Fixed menu to top
//    if (!fixed_menu) {
//
//        if (currentScrollY >= menuOrigin) {
//            getID('main_menu').classList.add('fixed');
//            fixed_menu = true;
//        }
//    } else if (currentScrollY <= menuOrigin) {
//        getID('main_menu').classList.remove('fixed');
//        fixed_menu = false;
//    }


    //Animates splash shapes
    if (getID('splash')) { //if the page has a splash screen
        if (currentScrollY <= windowHeight) {
            getID('splash_circle').style[transformProp] = 'translate3D(-' + easeInQuad(currentScrollY, 0, 100, windowHeight) + '%, ' + easeOutQuad(currentScrollY, 0, 30, windowHeight) + '%, 0)';

            getID('splash_triangle').style[transformProp] = 'translate3D(' + easeInQuad(currentScrollY, 0, 100, windowHeight) + '%, ' + easeOutQuad(currentScrollY, 0, 50, windowHeight) + '%, 0) rotate(' + easeInQuad(currentScrollY, 10, 50, windowHeight) + 'deg)'
        }
    }

    //selects elements one by one and does stuff to them or not
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i].node;
        var rect = object.getBoundingClientRect(); // gets the element's position in the window
        var top = rect.top; //gets element's distance from top of window

        if (top <= windowHeight * 0.9 && top > 0) {
            object.classList.remove('out');
            objects[i].visible = true;
        } else if (objects[i].visible && top > windowHeight * 0.9) {
            object.classList.add('out');
            objects[i].visible = false;
        }
    }

}



/*----------Let's start things up!-------------*/

//Add the .out class to all elements to be animated
initializeAnim();

//Makes sure that all elements become visible
update();

//Listens for any scrolling on the screen, then calls the onScroll function.
window.addEventListener('scroll', onScroll, false);


/*
Using animation optimizations taken from Rellax.js and https://www.html5rocks.com/en/tutorials/speed/animations/
*/
