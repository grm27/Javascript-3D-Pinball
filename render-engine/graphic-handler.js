let camera_x = 0.0;
let camera_y = 0.0;
let camera_z = 3.0;
let camera_elevation = 0.0;
let camera_angle = 0.5;

function main() {

    draw();
}

function draw() {

    // utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //update view matrix intercepting keyboard events
    updateViewMatrix();

    let perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    let viewMatrix = utils.MakeView(camera_x, camera_y, camera_z, camera_elevation, camera_angle);

    console.log(viewMatrix);
    graph.forEach(function (node) {
        gl.useProgram(program);
        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, node.worldMatrix);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        gl.uniformMatrix4fv(glslProperties.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(glslProperties.textLocation, texture);

        gl.bindVertexArray(node.drawInfo.vao);
        gl.drawElements(gl.TRIANGLES, node.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0);
    });

    window.requestAnimationFrame(draw);
}

function updateViewMatrix() {

    if (upArrowPressed) {
        if ((camera_y + CAMERA_STEP) < CAM_MAX_Y) {
            camera_y += CAMERA_STEP;
        }
    }

    if (downArrowPressed) {
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
