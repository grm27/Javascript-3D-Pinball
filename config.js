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


let localMatrices = [
    utils.MakeWorld(-0.30053, 8.5335, -5.9728, 0.0, 0.0, 0.0, 1.0),
    //TODO set right world matrix for BODY
    utils.MakeWorld(3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(1.1819, 9.1362, 0.020626, -6.51, 0.0, 0.0, 1.0),
    utils.MakeWorld(-1.5055, 9.1362, 0.020626, -6.51, 0.0, 0.0, 1.0),
    utils.MakeWorld(-0.11626, 9.1362, 0.020626, -6.51, 0.0, 0.0, 1.0),
    utils.MakeWorld(0.4366, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(0.713, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(0.9923, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(1.3917, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(1.6681, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(1.9474, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(-2.8273, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(-2.5509, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(-2.2716, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(-1.8722, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(-1.5958, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(-1.316, 12.789, 4.1852, 0.0, -101.0, 0.0, 1.0),
    utils.MakeWorld(2.6175, 8.7853, -6.6902, 0.0, 0.0, -90.0, 1.0),
    utils.MakeWorld(-2.97, 8.7853, -6.6902, 0.0, 0.0, 90.0, 1.0),
    utils.MakeWorld(0.6906, 8.4032, -5.6357, 29.8, -3.24, -5.64, 1.0),
    utils.MakeWorld(-1.307, 8.4032, -5.6357, 150.0, -3.24, -5.64, 1.0),
    utils.MakeWorld(-2.5264, 8.3925, -7.5892, 0.0, -90.0, 0.0, 1.0)
];
