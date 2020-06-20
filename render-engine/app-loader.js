var program;
var gl;
var shaderDir;
var baseDir;
var tableModel;
var modelStr = 'assets/objects/Body.obj';
var modelTexture = 'assets/StarWarsPinball.png';

async function init() {

    const path = window.location.pathname;
    const page = path.split("/").pop();
    baseDir = window.location.href.replace(page, '');
    shaderDir = baseDir + "render-engine/shaders/";

    let canvas = document.getElementById("c");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }
    initGlContext();

    await utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
        let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        program = utils.createProgram(gl, vertexShader, fragmentShader);

    });
    gl.useProgram(program);

    //###################################################################################
    //This loads the obj model
    let tableModelStr = await utils.get_objstr(baseDir + modelStr);
    tableModel = new OBJ.Mesh(tableModelStr);
    //###################################################################################

    main();
}

function main(){

    let objProp = loadModelProperties();
    let glslProperties = loadGlslProperties();

    bindModelProperties(objProp, glslProperties);
}

function initGlContext() {

    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 1.0, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
}

function loadModelProperties() {

    //Here we extract the position of the vertices, the normals, the indices, and the uv coordinates
    return {
        tableVertices: tableModel.vertices,
        tableNormals: tableModel.vertexNormals,
        tableIndices: tableModel.indices,
        tableTexCoords: tableModel.textures
    }
}

function loadGlslProperties() {

    return {
        positionAttributeLocation: gl.getAttribLocation(program, "a_position"),
        uvAttributeLocation: gl.getAttribLocation(program, "a_uv"),
        matrixLocation: gl.getUniformLocation(program, "matrix"),
        textLocation: gl.getUniformLocation(program, "u_texture")
    }
}

function bindModelProperties(objProp, glslProperties) {
    let lastUpdateTime = (new Date).getTime();

    let Rx = 0.0;
    let Ry = 0.0;
    let Rz = 0.0;
    let S = 3.0;

    let perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    let viewMatrix = utils.MakeView(0, 0.0, 3.0, 0.0, 0.0);

    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objProp.tableVertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(glslProperties.positionAttributeLocation);
    gl.vertexAttribPointer(glslProperties.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    let uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objProp.tableTexCoords), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(glslProperties.uvAttributeLocation);
    gl.vertexAttribPointer(glslProperties.uvAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objProp.tableIndices), gl.STATIC_DRAW);

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    let image = new Image();
    image.src = baseDir + modelTexture;
    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    };

    drawScene();

    function animate() {
        var currentTime = (new Date).getTime();
        if (lastUpdateTime != null) {
            var deltaC = (30 * (currentTime - lastUpdateTime)) / 1000.0;
      //      Rx += deltaC;
        ////    Ry -= deltaC;
      //      Rz += deltaC;
        }
        worldMatrix = utils.MakeWorld(-5.0, -5.0, -5.0, Rx, Ry, Rz, S);
        lastUpdateTime = currentTime;
    }

    function drawScene() {
        animate();

        utils.resizeCanvasToDisplaySize(gl.canvas);
        gl.clearColor(0.85, 0.85, 0.85, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        gl.uniformMatrix4fv(glslProperties.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(glslProperties.textLocation, texture);

        gl.bindVertexArray(vao);
        gl.drawElements(gl.TRIANGLES, objProp.tableIndices.length, gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(drawScene);
    }
}

window.onload = init;