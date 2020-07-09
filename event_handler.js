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

let rPressed = false;
function kDown(e)
{
    if(e.key === "r") //left arrow
    {

        rPressed = true;
    }
}

function kUp(e)
{
    if(e.key === "r") //left arrow
    {

        rPressed = false;
    }
}

let vPressed = false;
function vDown(e)
{
    if(e.key === "v") //left arrow
    {

        vPressed = true;
    }
}

function vUp(e)
{
    if(e.key === "v") //left arrow
    {

        vPressed = false;
    }
}

let bPressed = false;
function bDown(e)
{
    if(e.key === "b") //left arrow
    {

        bPressed = true;
    }
}

function bUp(e)
{
    if(e.key === "b") //left arrow
    {

        bPressed = false;
    }
}

let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;
let qPressed = false;
let ePressed = false;
let barPressed = true;

function wasdPressed(e){

    if(e.key === "w")
        wPressed = true;
    if(e.key === "a")
        aPressed = true;
    if(e.key === "s")
        sPressed = true;
    if(e.key === "d")
        dPressed = true;
    if(e.key === "q")
        qPressed = true;
    if(e.key === "e")
        ePressed = true;
}

function wasdReleased(e){

    if(e.key === "w")
        wPressed = false;
    if(e.key === "a")
        aPressed = false;
    if(e.key === "s")
        sPressed = false;
    if(e.key === "d")
        dPressed = false;
    if(e.key === "q")
        qPressed = false;
    if(e.key === "e")
        ePressed = false;
}


