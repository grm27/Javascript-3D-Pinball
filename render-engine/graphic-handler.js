let camera_x = 0.0;
let camera_y = 0.0;
let camera_z = 3.0;

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
    let viewMatrix = utils.MakeView(camera_x, camera_y, camera_z, 0.0, 0.5);

   // console.log(viewMatrix);
    graph.forEach(function (node) {

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



}
