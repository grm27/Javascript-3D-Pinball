let camera_x = CAMERA_X;
let camera_y = CAMERA_Y;
let camera_z = CAMERA_Z;
let camera_elevation = CAMERA_ELEVATION;
let camera_angle = CAMERA_ANGLE;

// Parameters for light definition (directional light)
var dirLightAlpha = -utils.degToRad(60);
var dirLightBeta  = -utils.degToRad(120);
// Use the Utils 0.2 to use mat3
var lightDirection = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
    Math.sin(dirLightAlpha),
    Math.cos(dirLightAlpha) * Math.sin(dirLightBeta),
];
var lightPosition = [0.0, 10.0, 5.0];
var ambientLightColor = [0.0, 0.0, 0.0, 1.0];
var lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
var ambientLightInfluence = 0.0;
var currentLightType = 5;

function main() {

    draw();
}

function draw() {

    // utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0.0, 0.0, 0.0, 0.3);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //update view matrix intercepting keyboard events
    resetPositions();

    updateViewMatrix();

    updateWorldMatrix();

    let perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    let viewMatrix = utils.MakeView(camera_x, camera_y, camera_z, camera_elevation, camera_angle);

    //graphRoot.localMatrix = utils.multiplyMatrices(animate(0.1), graphRoot.localMatrix);
    graphRoot.updateWorldMatrix();
    graph.forEach(function (node) {
        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, node.worldMatrix);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
        node.lightDir = utils.multiplyMatrix3Vector3(utils.transposeMatrix3(utils.sub3x3from4x4(node.worldMatrix)), lightDirection);
        node.lightPos = utils.multiplyMatrix3Vector3(utils.invertMatrix3(utils.sub3x3from4x4(node.worldMatrix)), lightPosition);
        gl.uniformMatrix4fv(glslLocations.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

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

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(glslLocations.textLocation, texture);

        gl.bindVertexArray(node.drawInfo.vao);
        gl.drawElements(gl.TRIANGLES, node.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0);
    });

    window.requestAnimationFrame(draw);
}

let aX = -0.2;
let aY = 0.0;
let aZ = 0.0;

let deltaX = 0.0;
let deltaY = 0.0;
let deltaZ = 0.0;

let velocityX = -0.1;
let velocityY = 0.0;
let velocityZ = 0.0;

function animate(deltaT) {
    velocityX += getDeltaV(deltaT, aX);
    velocityY += getDeltaV(deltaT, aY);
    velocityZ += getDeltaV(deltaT, aZ);

    console.log("VEL" + velocityX);
    deltaX = getDeltaS(deltaT, aX, velocityX) / 10;
    deltaY = getDeltaS(deltaT, aY, velocityY);
    deltaZ = getDeltaS(deltaT, aZ, velocityZ);
    console.log("DELTA " + deltaX);
    return utils.MakeTranslateMatrix(deltaX, deltaY, deltaZ);
}

function updateViewMatrix() {

    if (downArrowPressed) {
        if ((camera_y + CAMERA_STEP) < CAM_MAX_Y) {
            camera_y += CAMERA_STEP;
        }
    }

    if (upArrowPressed) {
        if ((camera_y - CAMERA_STEP) > CAM_MIN_Y) {
            camera_y -= CAMERA_STEP;
        }
    }

    if (rightArrowPressed) {
        if ((camera_x + CAMERA_STEP) < CAM_MAX_X) {
            camera_x += CAMERA_STEP;
        }
    }

    if (leftArrowPressed) {
        if ((camera_x - CAMERA_STEP) > CAM_MIN_X) {
            camera_x -= CAMERA_STEP;
        }
    }


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

function updateWorldMatrix() {

    let tableX = graphRoot.worldMatrix[OBJECT_X];
    let tableY = graphRoot.worldMatrix[OBJECT_Y];
    let updated = false;

    if (wPressed) {
        if ((tableY + TABLE_STEP) < TABLE_MAX_Y) {
            graphRoot.localMatrix[OBJECT_Y] += TABLE_STEP;
            updated = true;
        }
    }

    if (sPressed) {
        if ((tableY - TABLE_STEP) > TABLE_MIN_Y) {
            graphRoot.localMatrix[OBJECT_Y] -= TABLE_STEP;
            updated = true;
        }
    }

    if (dPressed) {
        if ((tableX + TABLE_STEP) < TABLE_MAX_X) {
            graphRoot.localMatrix[OBJECT_X] += TABLE_STEP;
            updated = true;
        }
    }

    if (aPressed) {
        if ((tableX - TABLE_STEP) > TABLE_MIN_X) {
            graphRoot.localMatrix[OBJECT_X] -= TABLE_STEP;
            updated = true;
        }
    }

    if (updated)
        graphRoot.updateWorldMatrix();
}

function resetPositions() {

    if (rPressed) {
        camera_x = CAMERA_X;
        camera_y = CAMERA_Y;
        camera_z = CAMERA_Z;
        camera_elevation = CAMERA_ELEVATION;
        camera_angle = CAMERA_ANGLE;

        graphRoot.localMatrix[OBJECT_X] = 0;
        graphRoot.localMatrix[OBJECT_Y] = 0;
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

function updateLightType(val) {
    currentLightType = parseInt(val);
}
