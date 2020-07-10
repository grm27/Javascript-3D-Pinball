let camera_x = CAMERA_X;
let camera_y = CAMERA_Y;
let camera_z = CAMERA_Z;
let camera_elevation = CAMERA_ELEVATION;
let camera_angle = CAMERA_ANGLE;

// Parameters for light definition (directional light)
var dirLightAlpha = -utils.degToRad(60);
var dirLightBeta = -utils.degToRad(120);

var lightDirection = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
    Math.sin(dirLightAlpha),
    Math.cos(dirLightAlpha) * Math.sin(dirLightBeta),
];
var decay = 1;
var specularColor = [1.0, 1.0, 0.0, 1.0];
var diffuseColor = [0.0, 0.0, 1.0, 1.0];
var lightPosition = [0.0, 10.0, 0.0];
var ambientLightColor = [0.0, 0.0, 0.0, 1.0];
var lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
var ambientLightInfluence = 0.0;
var currentLightType = 5;
var currentSpecularReflection = 1;
var objectSpecularPower = 20.0;

function main() {
    initWorld();
    draw();
}

function draw() {

    world.step();

    // utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0.0, 0.0, 0.0, 0.3);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //update view matrix intercepting keyboard events
    resetPositions();
    manageLights();
    updateViewMatrix();

    updateWorldMatrix();
    graphRoot.updateWorldMatrix();

    let perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    let viewMatrix = utils.MakeView(camera_x, camera_y, camera_z, camera_elevation, camera_angle);

    graph.forEach(function (node) {
        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, node.worldMatrix);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        node.lightDir = utils.multiplyMatrix3Vector3(utils.transposeMatrix3(utils.sub3x3from4x4(node.worldMatrix)), lightDirection);
        node.lightPos = utils.multiplyMatrix3Vector3(utils.invertMatrix3(utils.sub3x3from4x4(node.worldMatrix)), lightPosition);
        node.observerObj = utils.multiplyMatrix3Vector3(utils.invertMatrix3(utils.sub3x3from4x4(node.worldMatrix)), [camera_x, camera_y, camera_z]);

        gl.uniformMatrix4fv(glslLocations.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
        gl.uniformMatrix4fv(glslLocations.worldMatrixLocation, gl.FALSE, utils.transposeMatrix(node.worldMatrix));

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
        gl.uniform3f(glslLocations.lightDirection, node.lightDir[0],
            node.lightDir[1],
            node.lightDir[2]);
        gl.uniform3f(glslLocations.lightPosition, node.lightPos[0],
            node.lightPos[1],
            node.lightPos[2]);
        gl.uniform3f(glslLocations.eyePosition, node.observerObj[0],
            node.observerObj[1],
            node.observerObj[2]);
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

}

let ballX = 0;
let ballY = 9;
let ballZ = -8.5;

function updateWorldMatrix() {

    // if (rightArrowPressed) {
    //     // ball.state.pos.x += 0.1;
    //     ballX+=0.005;
    // }
    // if (leftArrowPressed) {
    //     // ball.state.pos.x -= 0.1;
    //     ballX-=0.005;
    // }

    // if (rightArrowPressed) {
    //     // ball.state.pos.y += 0.1;
    //     ballY+=0.005;
    // }
    // if (leftArrowPressed) {
    //     ballY-=0.005;
    // }
    //
    // if (upArrowPressed) {
    //     // ball.state.pos.y += 0.1;
    //     ballZ+=0.005;
    // }
    // if (downArrowPressed) {
    //     ballZ-=0.005;
    // }


    let ballPosition = [ball.state.pos.x, ball.state.pos.y, 0, 1];

    console.log("X:" + ball.state.pos.x);
    console.log("Y:" + ball.state.pos.y);
    console.log("Z:" + ballZ);

    //console.log("BEFORE:" + ballPosition);
    //from collision space to world space
    ballPosition = utils.multiplyMatrixVector(utils.MakeWorld(88, 2, 0, 45, 0, 0, 5.0), ballPosition);
    //console.log("AFTER:" + ballPosition);
    graph[objectIndex.BALL].localMatrix[OBJECT_X] = ballPosition[0];
    graph[objectIndex.BALL].localMatrix[OBJECT_Y] = ballPosition[1];
    graph[objectIndex.BALL].localMatrix[OBJECT_Z] = ballPosition[2];

    checkTableMovements();
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
        decay = val*100;
    else
        decay = 1000;
}

function updateLightType(val) {
    currentLightType = parseInt(val);
}

function updateSpecRefl(val) {
    currentSpecularReflection = parseInt(val);
}
