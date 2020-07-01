let program;
let gl;
let modelList = [];
let graph;
let graphRoot;
let glslProperties;
let texture;

async function init() {

    let canvas = document.getElementById("c");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }
    initGlContext();

    await utils.loadFiles([SHADER_DIR + 'vs.glsl', SHADER_DIR + 'fs.glsl'], function (shaderText) {
        let vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        let fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        program = utils.createProgram(gl, vertexShader, fragmentShader);
    });
    gl.useProgram(program);

    //This loads the obj models
    for (let i = 0; i < modelSources.length; i++) {
        let objStr = await utils.get_objstr(modelSources[i]);
        modelList.push(new OBJ.Mesh(objStr));
    }

    //Building the graph of the scene...
    buildSceneGraph();

    //load glsl properties
    glslProperties = loadGlslProperties();

    //bind glsl properties
    bindModelProperties();

    //load textures
    loadTextures();

    //call the main rendering function
    main();
}

function initGlContext() {

    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 1.0, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
}

function buildSceneGraph() {

    //define local matrices of each node
    let bodyNode = new Node();
    bodyNode.drawInfo = loadModelProperties(objectIndex.BODY);
    bodyNode.localMatrix = localMatrices[objectIndex.BODY];

    let ballNode = new Node();
    ballNode.drawInfo = loadModelProperties(objectIndex.BALL)
    ballNode.localMatrix = localMatrices[objectIndex.BALL];

    let dl1Node = new Node();
    dl1Node.drawInfo = loadModelProperties(objectIndex.DL1)
    dl1Node.localMatrix = localMatrices[objectIndex.DL1];

    let dl2Node = new Node();
    dl2Node.drawInfo = loadModelProperties(objectIndex.DL2)
    dl2Node.localMatrix = localMatrices[objectIndex.DL2];

    let dl3Node = new Node();
    dl3Node.drawInfo = loadModelProperties(objectIndex.DL3)
    dl3Node.localMatrix = localMatrices[objectIndex.DL3];

    let dl4Node = new Node();
    dl4Node.drawInfo = loadModelProperties(objectIndex.DL4)
    dl4Node.localMatrix = localMatrices[objectIndex.DL4];

    let dl5Node = new Node();
    dl5Node.drawInfo = loadModelProperties(objectIndex.DL5)
    dl5Node.localMatrix = localMatrices[objectIndex.DL5];

    let dl6Node = new Node();
    dl6Node.drawInfo = loadModelProperties(objectIndex.DL6)
    dl6Node.localMatrix = localMatrices[objectIndex.DL6];

    let dr1Node = new Node();
    dr1Node.drawInfo = loadModelProperties(objectIndex.BALL)
    dr1Node.localMatrix = localMatrices[objectIndex.DR1];

    let dr2Node = new Node();
    dr2Node.drawInfo = loadModelProperties(objectIndex.DR2)
    dr2Node.localMatrix = localMatrices[objectIndex.DR2];

    let dr3Node = new Node();
    dr3Node.drawInfo = loadModelProperties(objectIndex.DR3)
    dr3Node.localMatrix = localMatrices[objectIndex.DR3];

    let dr4Node = new Node();
    dr4Node.drawInfo = loadModelProperties(objectIndex.DR4)
    dr4Node.localMatrix = localMatrices[objectIndex.DR4];

    let dr5Node = new Node();
    dr5Node.drawInfo = loadModelProperties(objectIndex.DR5)
    dr5Node.localMatrix = localMatrices[objectIndex.DR5];

    let dr6Node = new Node();
    dr6Node.drawInfo = loadModelProperties(objectIndex.DR6)
    dr6Node.localMatrix = localMatrices[objectIndex.DR6];

    let leftFlipperNode = new Node();
    leftFlipperNode.drawInfo = loadModelProperties(objectIndex.LEFT_FLIPPER)
    leftFlipperNode.localMatrix = localMatrices[objectIndex.LEFT_FLIPPER];

    let rightFlipperNode = new Node();
    rightFlipperNode.drawInfo = loadModelProperties(objectIndex.RIGHT_FLIPPER)
    rightFlipperNode.localMatrix = localMatrices[objectIndex.RIGHT_FLIPPER];

    let leftButtonNode = new Node();
    leftButtonNode.drawInfo = loadModelProperties(objectIndex.LEFT_BUTTON)
    leftButtonNode.localMatrix = localMatrices[objectIndex.LEFT_BUTTON];

    let rightButtonNode = new Node();
    rightButtonNode.drawInfo = loadModelProperties(objectIndex.RIGHT_BUTTON)
    rightButtonNode.localMatrix = localMatrices[objectIndex.RIGHT_BUTTON];

    let pullerNode = new Node();
    pullerNode.drawInfo = loadModelProperties(objectIndex.PULLER)
    pullerNode.localMatrix = localMatrices[objectIndex.PULLER];

    let bumper1Node = new Node();
    bumper1Node.drawInfo = loadModelProperties(objectIndex.BUMPER1)
    bumper1Node.localMatrix = localMatrices[objectIndex.BUMPER1];

    let bumper2Node = new Node();
    bumper2Node.drawInfo = loadModelProperties(objectIndex.BUMPER2)
    bumper2Node.localMatrix = localMatrices[objectIndex.BUMPER2];

    let bumper3Node = new Node();
    bumper3Node.drawInfo = loadModelProperties(objectIndex.BUMPER3)
    bumper3Node.localMatrix = localMatrices[objectIndex.BUMPER3];

    graph = [
        ballNode,
        bodyNode,
        dl1Node,
        dl2Node,
        dl3Node,
        dl4Node,
        dl5Node,
        dl6Node,
        dr1Node,
        dr2Node,
        dr3Node,
        dr4Node,
        dr5Node,
        dr6Node,
        leftFlipperNode,
        rightFlipperNode,
        leftButtonNode,
        rightButtonNode,
        pullerNode,
        bumper1Node,
        bumper2Node,
        bumper3Node
    ];

    //define relationships
    for (let i = 0; i < graph.length; i++)
        if (i !== 1)
            graph[i].setParent(bodyNode);

    bodyNode.updateWorldMatrix();
    graphRoot = bodyNode;
}


function loadModelProperties(index) {

    //Here we extract the position of the vertices, the normals, the indices, and the uv coordinates
    return {
        vertices: modelList[index].vertices,
        normals: modelList[index].vertexNormals,
        indices: modelList[index].indices,
        texCords: modelList[index].textures
    }
}

function loadTextures() {
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    let image = new Image();
    image.src = BASE_DIR + ASSETS_TEXTURE_DIR;
    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
}

function loadGlslProperties() {

    return {
        positionAttributeLocation: gl.getAttribLocation(program, "a_position"),
        uvAttributeLocation: gl.getAttribLocation(program, "a_uv"),
        matrixLocation: gl.getUniformLocation(program, "matrix"),
        textLocation: gl.getUniformLocation(program, "u_texture")
    }
}

function bindModelProperties() {

    graph.forEach(function (node) {
        let vao = gl.createVertexArray();
        node.drawInfo.vao = vao;

        gl.bindVertexArray(vao);
        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(node.drawInfo.vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(glslProperties.positionAttributeLocation);
        gl.vertexAttribPointer(glslProperties.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        //TODO set normals in shaders
        //    let normalBuffer = gl.createBuffer();
        //   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(node.drawInfo.normals), gl.STATIC_DRAW);
        //  gl.enableVertexAttribArray(normalAttributeLocation[i]);
        //  gl.vertexAttribPointer(normalAttributeLocation[i], 3, gl.FLOAT, false, 0, 0);

        let uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(node.drawInfo.texCords), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(glslProperties.textLocation);
        gl.vertexAttribPointer(glslProperties.textLocation, 2, gl.FLOAT, false, 0, 0);


        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(node.drawInfo.indices), gl.STATIC_DRAW);
    });

}

window.onload = init;