// UP
let upArrowPressed = false;
function upArrowDown(e)
{
    if(e.key === "ArrowUp") //up arrow
    {

        upArrowPressed = true;
    }
}

function upArrowUp(e)
{
    if(e.key === "ArrowUp") //up bar
    {

        upArrowPressed = false;
    }
}

//DOWN
let downArrowPressed = false;
function downArrowDown(e)
{
    if(e.key === "ArrowDown") //down arrow
    {

        downArrowPressed = true;
    }
}

function downArrowUp(e)
{
    if(e.key === "ArrowDown") //down arrow
    {

        downArrowPressed = false;
    }
}

//RIGHT
let rightArrowPressed = false;
function rightArrowDown(e)
{
    if(e.key === "ArrowRight") //right arrow
    {

        rightArrowPressed = true;
    }
}


//RIGHT
function rightArrowUp(e)
{
    if(e.key === "ArrowRight") //right arrow
    {

        rightArrowPressed = false;
    }
}

let leftArrowPressed = false;
function leftArrowDown(e)
{
    if(e.key === "ArrowLeft") //left arrow
    {

        leftArrowPressed = true;
    }
}

function leftArrowUp(e)
{
    if(e.key === "ArrowLeft") //left arrow
    {

        leftArrowPressed = false;
    }
}


let uPressed = false;
function uDown(e)
{
    if(e.key === "u") //up arrow
    {

        uPressed = true;
    }
}

function uUp(e)
{
    if(e.key === "u") //up bar
    {

        uPressed = false;
    }
}


let jPressed = false;
function jDown(e)
{
    if(e.key === "j") //down arrow
    {

        jPressed = true;
    }
}

function jUp(e)
{
    if(e.key === "j") //down arrow
    {

        jPressed = false;
    }
}


let hPressed = false;
function hDown(e)
{
    if(e.key === "h") //right arrow
    {

        hPressed = true;
    }
}


function hUp(e)
{
    if(e.key === "h") //right arrow
    {

        hPressed = false;
    }
}

let kPressed = false;
function kDown(e)
{
    if(e.key === "k") //left arrow
    {

        kPressed = true;
    }
}

function kUp(e)
{
    if(e.key === "k") //left arrow
    {

        kPressed = false;
    }
}


// PALETTE KEY PRESS
var p1UP = false;
var p2UP = false;

function paletteUPMovement(e)
{
    if (e.key === 81) //q
    {
        p1UP = true;
    }
    if (e.key === 80) //p
    {
        p2UP = true;
    }
}

function paletteDOWNMovement(e)
{
    if (e.key === 81) //q
    {

        p1UP = false;
    }
    if (e.key === 80) //p
    {
        p2UP = false;
    }
}


// CAMERA KEY PRESS
var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;
function doMouseDown(e) {
    if(e.button === 0){
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;
        mouseState = true;
    }
}

function doMouseUp(e) {
    if(e.button === 0){
        lastMouseX = -100;
        lastMouseY = -100;
        mouseState = false;
    }
}

function doMouseMove(e) {
    if(mouseState) {
        var dx = e.pageX - lastMouseX;
        var dy = lastMouseY - e.pageY;
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;

        if((dx != 0) || (dy != 0)) {
            angle = angle - 0.2 * dx;
            elevation = elevation + 0.2 * dy;
        }
    }
}

function doMouseWheel(e) {
    var nLookRadius = lookRadius +  Math.sign(e.wheelDelta);
    lookRadius = nLookRadius;
}

function resetCam(e){
    cx = 0.0;
    cy = 10.0;
    cz = 25.0;
    elevation = -25.0;
    angle = 0.0;
    lookRadius = 30.0;
}


// BALL RECENTER KEY PRESS
function resetBall(e){
    if(e.key === 82) //r
    {
        recentered = true;
    }
}
// RELOADER KEY PRESS
var rUP = false;

function reloaderUPMovement(e)
{
    if(e.key === 32) //space bar
    {
        document.getElementById("Lost").style.visibility = "hidden";
        rUP = true;
    }
}
function reloaderDOWNMovement(e)
{
    if(e.key === 32) //space bar
    {

        rUP = false;
        recentered = false;
    }
}


// PALETTE KEY PRESS
var p1UP = false;
var p2UP = false;

function paletteUPMovement(e)
{
    if (e.key === 81) //q
    {
        p1UP = true;
    }
    if (e.key === 80) //p
    {
        p2UP = true;
    }
}

function paletteDOWNMovement(e)
{
    if (e.key === 81) //q
    {

        p1UP = false;
    }
    if (e.key === 80) //p
    {
        p2UP = false;
    }
}


// CAMERA KEY PRESS
var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;
function doMouseDown(e) {
    if(e.button === 0){
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;
        mouseState = true;
    }
}

function doMouseUp(e) {
    if(e.button === 0){
        lastMouseX = -100;
        lastMouseY = -100;
        mouseState = false;
    }
}

function doMouseMove(e) {
    if(mouseState) {
        var dx = e.pageX - lastMouseX;
        var dy = lastMouseY - e.pageY;
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;

        if((dx != 0) || (dy != 0)) {
            angle = angle - 0.2 * dx;
            elevation = elevation + 0.2 * dy;
        }
    }
}

function doMouseWheel(e) {
    var nLookRadius = lookRadius +  Math.sign(e.wheelDelta);
    lookRadius = nLookRadius;
}

function resetCam(e){
    cx = 0.0;
    cy = 10.0;
    cz = 25.0;// RELOADER KEY PRESS
    var rUP = false;

    function reloaderUPMovement(e)
    {
        if(e.key === 32) //space bar
        {
            document.getElementById("Lost").style.visibility = "hidden";
            rUP = true;
        }
    }
    function reloaderDOWNMovement(e)
    {
        if(e.key === 32) //space bar
        {

            rUP = false;
            recentered = false;
        }
    }


// PALETTE KEY PRESS
    var p1UP = false;
    var p2UP = false;

    function paletteUPMovement(e)
    {
        if (e.key === 81) //q
        {
            p1UP = true;
        }
        if (e.key === 80) //p
        {
            p2UP = true;
        }
    }

    function paletteDOWNMovement(e)
    {
        if (e.key === 81) //q
        {

            p1UP = false;
        }
        if (e.key === 80) //p
        {
            p2UP = false;
        }
    }


// CAMERA KEY PRESS
    var mouseState = false;
    var lastMouseX = -100, lastMouseY = -100;
    function doMouseDown(e) {
        if(e.button === 0){
            lastMouseX = e.pageX;
            lastMouseY = e.pageY;
            mouseState = true;
        }
    }

    function doMouseUp(e) {
        if(e.button === 0){
            lastMouseX = -100;
            lastMouseY = -100;
            mouseState = false;
        }
    }

    function doMouseMove(e) {
        if(mouseState) {
            var dx = e.pageX - lastMouseX;
            var dy = lastMouseY - e.pageY;
            lastMouseX = e.pageX;
            lastMouseY = e.pageY;

            if((dx != 0) || (dy != 0)) {
                angle = angle - 0.2 * dx;
                elevation = elevation + 0.2 * dy;
            }
        }
    }

    function doMouseWheel(e) {
        var nLookRadius = lookRadius +  Math.sign(e.wheelDelta);
        lookRadius = nLookRadius;
    }

    function resetCam(e){
        cx = 0.0;
        cy = 10.0;
        cz = 25.0;
        elevation = -25.0;
        angle = 0.0;
        lookRadius = 30.0;
    }


// BALL RECENTER KEY PRESS
    function resetBall(e){
        if(e.key === 82) //r
        {
            recentered = true;
        }
    }

    elevation = -25.0;
    angle = 0.0;
    lookRadius = 30.0;
}


// BALL RECENTER KEY PRESS
function resetBall(e){
    if(e.key === 82) //r
    {
        recentered = true;
    }
}
