let camera_x = CAMERA_X;
let camera_y = CAMERA_Y;
let camera_z = CAMERA_Z;
let camera_elevation = CAMERA_ELEVATION;
let camera_angle = CAMERA_ANGLE;

// Parameters for light definition (directional light)
let dirLightAlpha = -utils.degToRad(40);
let dirLightBeta = -utils.degToRad(40);

let lightDirection = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
    Math.sin(dirLightAlpha),
    Math.cos(dirLightAlpha) * Math.sin(dirLightBeta),
];

let decay = 1;
let specularColor = [1.0, 1.0, 0.0, 1.0];
let diffuseColor = [0.0, 0.0, 1.0, 1.0];
let lightPosition = [0.0, 10.0, 0.0];
let ambientLightColor = [0.0, 0.0, 0.0, 1.0];
let lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
let ambientLightInfluence = 0.0;
let currentLightType = 5;
let currentSpecularReflection = 1;
let objectSpecularPower = 20.0;
let eye = [camera_x, camera_y, camera_z];
function main() {

    draw();
}

function draw() {

    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0.0, 0.0, 0.0, 0.3);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(programArray[currShader]);
    glslLocations = loadGlslProperties();

    //update view matrix intercepting keyboard events
    resetPositions();

    manageLights();

    updateViewMatrix();

    updateWorldMatrices();

    let perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    let viewMatrix = utils.MakeView(camera_x, camera_y, camera_z, camera_elevation, camera_angle);

    graph.forEach(function (node) {

        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, node.worldMatrix);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        gl.uniformMatrix4fv(glslLocations.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
        gl.uniformMatrix4fv(glslLocations.worldMatrixLocation, gl.FALSE, utils.transposeMatrix(node.worldMatrix));

        gl.uniformMatrix4fv(glslLocations.nMatrixLocation, gl.FALSE, utils.invertMatrix(utils.transposeMatrix(node.worldMatrix)));

        gl.uniform4f(glslLocations.ambientLocation, ambientLightColor[0],
            ambientLightColor[1],
            ambientLightColor[2],
            ambientLightColor[3]);
        gl.uniform1f(glslLocations.ambientLightInfluence, ambientLightInfluence);

        gl.uniform1i(glslLocations.lightType, currentLightType);
        gl.uniform4f(glslLocations.lightColor, lightColor[0],
            lightColor[1],
            lightColor[2],
            lightColor[3]);
        gl.uniform3f(glslLocations.lightDirection, lightDirection[0],
            lightDirection[1],
            lightDirection[2]);
        gl.uniform3f(glslLocations.lightPosition, lightPosition[0],
            lightPosition[1],
            lightPosition[2]);
        gl.uniform3f(glslLocations.eyePosition, eye[0],
            eye[1],
            eye[2]);
        gl.uniform1i(glslLocations.specularReflLocation, currentSpecularReflection);
        gl.uniform4f(glslLocations.mSpecColorLocation, specularColor[0],
            specularColor[1],
            specularColor[2],
            specularColor[3]);
        gl.uniform1f(glslLocations.mSpecPowerLocation, objectSpecularPower);
        gl.uniform4f(glslLocations.diffColorLocation, diffuseColor[0],
            diffuseColor[1],
            diffuseColor[2],
            diffuseColor[3]);
        gl.uniform1f(glslLocations.decayLocation, decay);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(glslLocations.textLocation, texture);

        gl.bindVertexArray(node.drawInfo.vao);
        gl.drawElements(gl.TRIANGLES, node.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0);
    });

    window.requestAnimationFrame(draw);
}

function updateViewMatrix() {


    if (uPressed) {
        if ((camera_elevation + CAMERA_ANGLE_STEP) < CAM_MAX_ELEVATION) {
            camera_elevation += CAMERA_ANGLE_STEP;
        }
    }

    if (jPressed) {
        if ((camera_elevation - CAMERA_ANGLE_STEP) > CAM_MIN_ELEVATION) {
            camera_elevation -= CAMERA_ANGLE_STEP;
        }
    }

    if (hPressed) {
        if ((camera_angle + CAMERA_ANGLE_STEP) < CAM_MAX_ANGLE) {
            camera_angle += CAMERA_ANGLE_STEP;
        }
    }

    if (kPressed) {
        if ((camera_angle - CAMERA_ANGLE_STEP) > CAM_MIN_ANGLE) {
            camera_angle -= CAMERA_ANGLE_STEP;
        }
    }

    if (upArrowPressed)
        camera_z += 0.1;
    if (downArrowPressed)
        camera_z -= 0.1;
    if (leftArrowPressed)
        camera_x -= 0.1;
    if (rightArrowPressed)
        camera_x += 0.1;

}

function updateWorldMatrices() {

    //add one delta t to the world environment
    worldStep();

    graph[objectIndex.PULLER].localMatrix = utils.MakeWorld(-2.5264, 8.3925, -7.1 - pullerPos, -90, 0, 0, 1);
    graph[objectIndex.BALL].localMatrix = getBallLocalMatrix(ball.position.x, ball.position.y);

    let paddleMatrices = getWorldPaddlePositions();
    graph[objectIndex.LEFT_PADDLE].localMatrix = paddleMatrices.left;
    graph[objectIndex.RIGHT_PADDLE].localMatrix = paddleMatrices.right;

    //update the world matrix of the table according to the given input
    checkTableMovements();

    //update all the world matrices
    graphRoot.updateWorldMatrix();
}

function checkTableMovements() {

    let tableX = graphRoot.localMatrix[OBJECT_X];
    let tableY = graphRoot.localMatrix[OBJECT_Y];
    let tableZ = graphRoot.localMatrix[OBJECT_Z];

    if (wPressed) {
        if ((tableY + TABLE_STEP) < TABLE_MAX_Y) {
            graphRoot.localMatrix[OBJECT_Y] += TABLE_STEP;
        }
    }

    if (sPressed) {
        if ((tableY - TABLE_STEP) > TABLE_MIN_Y) {
            graphRoot.localMatrix[OBJECT_Y] -= TABLE_STEP;
        }
    }

    if (dPressed) {
        if ((tableX + TABLE_STEP) < TABLE_MAX_X) {
            graphRoot.localMatrix[OBJECT_X] += TABLE_STEP;
        }
    }

    if (aPressed) {
        if ((tableX - TABLE_STEP) > TABLE_MIN_X) {
            graphRoot.localMatrix[OBJECT_X] -= TABLE_STEP;
        }
    }

    if (qPressed) {
        if ((tableZ + TABLE_STEP) < TABLE_MAX_Z) {
            graphRoot.localMatrix[OBJECT_Z] += TABLE_STEP;
        }
    }

    if (ePressed) {
        if ((tableZ - TABLE_STEP) > TABLE_MIN_Z) {
            graphRoot.localMatrix[OBJECT_Z] -= TABLE_STEP;
        }
    }

}

function resetPositions() {

    if (rPressed) {
        camera_x = CAMERA_X;
        camera_y = CAMERA_Y;
        camera_z = CAMERA_Z;
        camera_elevation = CAMERA_ELEVATION;
        camera_angle = CAMERA_ANGLE;

        graphRoot.localMatrix[OBJECT_X] = TABLE_X;
        graphRoot.localMatrix[OBJECT_Y] = TABLE_Y;
        graphRoot.localMatrix[OBJECT_Z] = TABLE_Z;

        lightPosition[0] = 0.0;
    }
}

function manageLights() {

    if (vPressed && currentLightType !== 5) {
        lightPosition[0] += 1.0;
    }
    if (bPressed && currentLightType !== 5) {
        lightPosition[0] -= 1.0;
    }
}

function updateNodeMatrix(i, transformationMatrix) {

    graph[i].localMatrix = utils.multiplyMatrices(transformationMatrix, graph[i].localMatrix);
}

function updateAmbientLightColor(val) {

    val = val.replace('#', '');
    ambientLightColor[0] = parseInt(val.substring(0, 2), 16) / 255;
    ambientLightColor[1] = parseInt(val.substring(2, 4), 16) / 255;
    ambientLightColor[2] = parseInt(val.substring(4, 6), 16) / 255;
    ambientLightColor[3] = 1.0;
}

function updateLightColor(val) {

    val = val.replace('#', '');
    lightColor[0] = parseInt(val.substring(0, 2), 16) / 255;
    lightColor[1] = parseInt(val.substring(2, 4), 16) / 255;
    lightColor[2] = parseInt(val.substring(4, 6), 16) / 255;
    lightColor[3] = 1.0;
}

function updateAmbientLightInfluence(val) {

    ambientLightInfluence = val;
}

function updateDecay(val) {

    if (val < 0.1)
        //no decay
        decay = 1.0;
    else if (val < 1.0)
        decay = val * 100;
    else
        decay = 1000;
}

function updateLightType(val) {

    currentLightType = parseInt(val);
}

function updateSpecRefl(val) {

    currentSpecularReflection = parseInt(val);
}

function updateSpecularColor(val) {

    val = val.replace('#', '');
    specularColor[0] = parseInt(val.substring(0, 2), 16) / 255;
    specularColor[1] = parseInt(val.substring(2, 4), 16) / 255;
    specularColor[2] = parseInt(val.substring(4, 6), 16) / 255;
    specularColor[3] = 1.0;
}

function updateShader(val) {

    currShader = parseInt(val);
}

const elevation = 8.5335; // y
const elevation_reference = -5.9728; // at which z the elevation was measured
const slope = 0.11411241; // tan(6.51 deg)

function getBallLocalMatrix(physX, physY) {
    let x = 2.2 - physX;
    let z = physY - 6.7;
    let y = elevation + slope * (z - elevation_reference);
    return utils.MakeWorld(x, y, z, 0, 0, 0, 1);
}

function getWorldPaddlePositions() {

    return {
        left: utils.MakeWorld(0.6906, 8.4032, -5.6357, -3.24, -(leftPaddle.getInclination() / Math.PI * 180), -5.64, 1),
        right: utils.MakeWorld(-1.307, 8.4032, -5.6357, -3.24, -(rightPaddle.getInclination() / Math.PI * 180), -5.64, 1)
    }
}

