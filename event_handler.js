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

let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;

function wasdPressed(e){

    if(e.key === "w")
        wPressed = true;
    if(e.key === "a")
        aPressed = true;
    if(e.key === "s")
        sPressed = true;
    if(e.key === "d")
        dPressed = true;
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
}


