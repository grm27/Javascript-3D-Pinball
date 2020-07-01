function main() {
    var perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    var viewMatrix = utils.MakeView(0.0, 0.0, 0.0, 0.0, 0.0);

    draw(perspectiveMatrix, viewMatrix);
}

function draw(perspectiveMatrix, viewMatrix) {


    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    graph.forEach(function (node) {
        console.log(node);
        let viewWorldMatrix = utils.multiplyMatrices(viewMatrix, node.worldMatrix);
        let projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        gl.uniformMatrix4fv(glslProperties.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(glslProperties.textLocation, texture);

        gl.bindVertexArray(node.drawInfo.vao);
        gl.drawElements(gl.TRIANGLES, node.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(draw);
    });

}