const CAMERA_X = 0.0;
const CAMERA_Y = 13.0;
const CAMERA_Z = -7.3;
const CAMERA_ELEVATION = -40.0;
const CAMERA_ANGLE = 180.0;

let camera_x = CAMERA_X;
let camera_y = CAMERA_Y;
let camera_z = CAMERA_Z;
let camera_elevation = CAMERA_ELEVATION;
let camera_angle = CAMERA_ANGLE;

var ambientLightColor = [0.0, 0.0, 0.0, 1.0];

function main() {

    draw();
}

function draw() {

    // utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0.0, 0.0, 0.0, 0.3);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //update view matrix intercepting keyboard events
    updateViewMatrix();

    let perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    let viewMatrix = utils.MakeView(camera_x, camera_y, camera_z, camera_elevation, camera_angle);

    graph.forEach(function (node) {
        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, node.worldMatrix);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        gl.uniformMatrix4fv(glslLocations.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

        gl.uniform4f(glslLocations.ambientLocation, ambientLightColor[0],
            ambientLightColor[1],
            ambientLightColor[2],
            ambientLightColor[3]);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(glslLocations.textLocation, texture);

        gl.bindVertexArray(node.drawInfo.vao);
        gl.drawElements(gl.TRIANGLES, node.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0);
    });

    window.requestAnimationFrame(draw);
}

let aX = 0.0;
let aY = 0.0;
let aZ = 0.0;

let deltaX = 0.0;
let deltaY = 0.0;
let deltaZ = 0.0;

let velocityX = -20.0;
let velocityY = 0.0;
let velocityZ = 0.0;

function animate(deltaT){
    velocityX += getDeltaV(deltaT, aX);
    velocityY += getDeltaV(deltaT, aY);
    velocityZ += getDeltaV(deltaT, aZ);

    deltaX = getDeltaS(deltaT, aX, velocityX);
    deltaY = getDeltaS(deltaT, aY, velocityY);
    deltaZ = getDeltaS(deltaT, aZ, velocityZ);

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

    if (rPressed) {
        camera_x = CAMERA_X;
        camera_y = CAMERA_Y;
        camera_z = CAMERA_Z;
        camera_elevation = CAMERA_ELEVATION;
        camera_angle = CAMERA_ANGLE;
    }

}

function updateAmbientLightColor(val) {
    val = val.replace('#','');
    ambientLightColor[0] = parseInt(val.substring(0,2), 16) / 255;
    ambientLightColor[1] = parseInt(val.substring(2,4), 16) / 255;
    ambientLightColor[2] = parseInt(val.substring(4,6), 16) / 255;
    ambientLightColor[3] = 1.0;
}
