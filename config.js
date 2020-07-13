//Project locations constants
const PATH = window.location.pathname;
const PAGE = PATH.split('/').pop();
const BASE_DIR = window.location.href.replace(PAGE, '');
const SHADER_DIR = BASE_DIR + "render-engine/shaders/";
const ASSETS_OBJECT_DIR = "assets/objects/";
const ASSETS_TEXTURE_DIR = "assets/StarWarsPinball.png";


//Camera constants
const CAMERA_X = 0.0;
const CAMERA_Y = 15;
const CAMERA_Z = -7.0;
const CAMERA_ELEVATION = -54;
const CAMERA_ANGLE = 180.0;

const CAM_MAX_X = 10.0;
const CAM_MAX_Y = 12.5;
const CAM_MIN_X = -10.0;
const CAM_MIN_Y = -10.0;
const CAM_MAX_ELEVATION = 90.0;
const CAM_MAX_ANGLE = 360.0;
const CAM_MIN_ELEVATION = -90.0;
const CAM_MIN_ANGLE = -90.0;
const CAMERA_STEP = 0.1;
const CAMERA_ANGLE_STEP = 1.0;


//TABLE MOVEMENTS CONSTANTS
const TABLE_MAX_X = 100.0;
const TABLE_MAX_Y = 100.0;
const TABLE_MAX_Z = 100.0;
const TABLE_MIN_X = -100.0;
const TABLE_MIN_Y = -100.0;
const TABLE_MIN_Z = -100.0;

const TABLE_X = 0.0;
const TABLE_Y = 0.0;
const TABLE_Z = 0.0;
const TABLE_MAX_ELEVATION = 90.0;
const TABLE_MAX_ANGLE = 90.0;
const TABLE_MIN_ELEVATION = -90.0;
const TABLE_MIN_ANGLE = -90.0;
const TABLE_STEP = 0.05;
const TABLE_ANGLE_STEP = 1.0;


//OBJECT CONSTANTS
const OBJECT_X = 3;
const OBJECT_Y = 7;
const OBJECT_Z = 11;

const UVmap = {
    "0": [0.735309, 0.956854, 0.760579, 0.918019, 0.760579, 0.956854, 0.735309, 0.918019],
    "1": [0.636297, 0.996017, 0.661567, 0.957183, 0.661567, 0.996017, 0.636297, 0.957183],
    "2": [0.660956, 0.996505, 0.686226, 0.957671, 0.686226, 0.996505, 0.660956, 0.957671],
    "3": [0.685614, 0.996261, 0.710884, 0.957427, 0.710884, 0.996261, 0.685614, 0.957427],
    "4": [0.710760, 0.996749, 0.736030, 0.957915, 0.736030, 0.996749, 0.710760, 0.957915],
    "5": [0.735907, 0.996749, 0.761177, 0.957915, 0.761177, 0.996749, 0.735907, 0.957915],
    "6": [0.635321, 0.956466, 0.660591, 0.917632, 0.660591, 0.956466, 0.635321, 0.917632],
    "7": [0.660705, 0.956272, 0.685975, 0.917438, 0.685975, 0.956272, 0.660705, 0.917438],
    "8": [0.684927, 0.956466, 0.710197, 0.917632, 0.710197, 0.956466, 0.684927, 0.917632],
    "9": [0.710118, 0.956466, 0.735388, 0.917632, 0.735388, 0.956466, 0.710118, 0.917632]
}

//Scene object constants
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
    LEFT_PADDLE: 19,
    RIGHT_PADDLE: 20,
    PULLER: 21
}


const modelSources = [
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

//same order of model sources and object index
const localMatrices = [
    utils.MakeWorld(-0.30053, 8.5335, -5.9728, 0.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(TABLE_X, TABLE_Y, TABLE_Z, 0.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(1.1819, 9.1362, 0.020626, 0.0, -6.51, 0.0, 1.0),
    utils.MakeWorld(-1.5055, 9.1362, 0.020626, 0.0, -6.51, 0.0, 1.0),
    utils.MakeWorld(-0.11626, 9.1362, 0.020626, 0.0, -6.51, 0.0, 1.0),
    utils.MakeWorld(0.4366, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(0.713, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(0.9923, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(1.3917, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(1.6681, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(1.9474, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(-2.8273, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(-2.5509, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(-2.2716, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(-1.8722, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(-1.5958, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(-1.316, 12.789, 4.1852, -101.0, 0.0, 0.0, 1.0),
    utils.MakeWorld(2.6175, 8.7853, -6.6902, 0.0, 0.0, -90.0, 1.0),
    utils.MakeWorld(-2.97, 8.7853, -6.6902, 0.0, 0.0, 90.0, 1.0),
    utils.MakeWorld(0.6906, 8.4032, -5.6357, -3.24, 29.8, -5.64, 1.0),
    utils.MakeWorld(-1.307, 8.4032, -5.6357, -3.24, 150.0, -5.64, 1.0),
    utils.MakeWorld(-2.5264, 8.3925, -7.5892, -90.0, 0.0, 0.0, 1.0)
];



