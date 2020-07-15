let upArrowPressed = false;
let downArrowPressed = false;
let rightArrowPressed = false;
let leftArrowPressed = false;
let uPressed = false;
let jPressed = false;
let hPressed = false;
let kPressed = false;
let rPressed = false;
let vPressed = false;
let bPressed = false;
let wPressed = false;
let aPressed = false;
let sPressed = false;
let dPressed = false;
let qPressed = false;
let ePressed = false;

function handleDown(e) {

    upArrowPressed = e.key === "ArrowUp";
    downArrowPressed = e.key === "ArrowDown";
    rightArrowPressed = e.key === "ArrowRight";
    leftArrowPressed = e.key === "ArrowLeft";

    uPressed = e.key === "u";
    jPressed = e.key === "j";
    hPressed = e.key === "h";
    kPressed = e.key === "k";
    rPressed = e.key === "r";
    vPressed = e.key === "v";
    bPressed = e.key === "b";
    wPressed = e.key === "w";
    aPressed = e.key === "a";
    sPressed = e.key === "s";
    dPressed = e.key === "d";
    qPressed = e.key === "q";
    ePressed = e.key === "e";


    leftPaddle.active = e.key === "x";
    rightPaddle.active = e.key === "n";
    pulling = e.key === " ";
}

function handleUp(e) {

    if (e.key === "ArrowUp")
        upArrowPressed = false;
    if (e.key === "ArrowDown")
        downArrowPressed = false;
    if (e.key === "ArrowRight")
        rightArrowPressed = false;
    if (e.key === "ArrowLeft")
        leftArrowPressed = false;
    if (e.key === "u")
        uPressed = false;
    if (e.key === "j")
        jPressed = false;
    if (e.key === "h")
        hPressed = false;
    if (e.key === "k")
        kPressed = false;
    if (e.key === "r")
        rPressed = false;
    if (e.key === "v")
        vPressed = false;
    if (e.key === "b")
        bPressed = false;
    if (e.key === "w")
        wPressed = false;
    if (e.key === "a")
        aPressed = false;
    if (e.key === "s")
        sPressed = false;
    if (e.key === "d")
        dPressed = false;
    if (e.key === "q")
        qPressed = false;
    if (e.key === "e")
        ePressed = false;

    if (e.key === "x")
        leftPaddle.active = false;
    if (e.key === "n")
        rightPaddle.active = false;
    if (e.key === " ") {
        pulling = !!ball.throw(pullerPos);
    }
}


