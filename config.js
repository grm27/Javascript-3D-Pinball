const PATH = window.location.pathname;
const PAGE = PATH.split('/').pop();
const BASE_DIR = window.location.href.replace(PAGE, '');
const SHADER_DIR = BASE_DIR + "render-engine/shaders/";

const ASSETS_OBJECT_DIR = "assets/objects/";
const ASSETS_TEXTURE_DIR = "assets/StarWarsPinball.png";

const objectIndex = {
    BALL: 0,
    BODY: 1,
    BUMPER1: 2,
    BUMPER2: 3,
    BUMPER3: 4,
    DL1: 5,
    DL2: 6,
    DL3: 7,
    DL4: 8,
    DL5: 9,
    DL6: 10,
    DR1: 11,
    DR2: 12,
    DR3: 13,
    DR4: 14,
    DR5: 15,
    DR6: 16,
    LEFT_BUTTON: 17,
    RIGHT_BUTTON: 18,
    LEFT_FLIPPER: 19,
    RIGHT_FLIPPER: 20,
    PULLER: 21
}


let modelSources = [
    BASE_DIR + ASSETS_OBJECT_DIR + "Ball.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "Body.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "bumper1.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "bumper2.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "bumper3.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DL1.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DL2.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DL3.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DL4.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DL5.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DL6.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DR1.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DR2.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DR3.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DR4.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DR5.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "DR6.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "LeftButton.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "RightButton.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "LeftFlipper.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "RightFlipper.obj",
    BASE_DIR + ASSETS_OBJECT_DIR + "Puller.obj",
];