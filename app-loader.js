//let program;
let currShader = 0;
let programArray = [];
let gl;
let meshes = [];
let graph;
let graphRoot;
let glslLocations;
let texture;

async function init() {

    let canvas = document.getElementById("c");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }

    await utils.loadFiles([SHADER_DIR + 'vs_v.glsl', SHADER_DIR + 'fs_v.glsl',
            SHADER_DIR + 'vs_p.glsl', SHADER_DIR + 'fs_p.glsl'],
        function (shaderText) {
            let vertexShader_v = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
            let fragmentShader_v = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
            let vertexShader_p = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[2]);
            let fragmentShader_p = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[3]);
            programArray.push(utils.createProgram(gl, vertexShader_v, fragmentShader_v));
            programArray.push(utils.createProgram(gl, vertexShader_p, fragmentShader_p));
        });
    gl.useProgram(programArray[0]);
    initGlContext();

    //This loads the obj models
    for (let i = 0; i < modelSources.length; i++) {
        let objStr = await utils.get_objstr(modelSources[i]);
        meshes.push(new OBJ.Mesh(objStr));
    }

    //Building the graph of the scene...
    buildSceneGraph();

    //load glsl properties
    glslLocations = loadGlslProperties();

    //load textures
    loadTextures();

    //bind glsl properties
    bindModelProperties();

    //init the core engine
    initCore();

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
    let bodyNode = new SceneNode();
    bodyNode.name = "body";
    bodyNode.drawInfo = loadModelProperties(objectIndex.BODY);
    bodyNode.localMatrix = localMatrices[objectIndex.BODY];

    let ballNode = new SceneNode();
    ballNode.name = "ballNode";
    ballNode.drawInfo = loadModelProperties(objectIndex.BALL)
    ballNode.localMatrix = localMatrices[objectIndex.BALL];

    let dl1Node = new SceneNode();
    dl1Node.name = "dl1Node";
    dl1Node.drawInfo = loadModelProperties(objectIndex.DL1)
    dl1Node.localMatrix = localMatrices[objectIndex.DL1];

    let dl2Node = new SceneNode();
    dl2Node.name = "dl2Node";
    dl2Node.drawInfo = loadModelProperties(objectIndex.DL2)
    dl2Node.localMatrix = localMatrices[objectIndex.DL2];

    let dl3Node = new SceneNode();
    dl3Node.name = "dl3Node";
    dl3Node.drawInfo = loadModelProperties(objectIndex.DL3)
    dl3Node.localMatrix = localMatrices[objectIndex.DL3];

    let dl4Node = new SceneNode();
    dl4Node.name = "dl4Node";
    dl4Node.drawInfo = loadModelProperties(objectIndex.DL4)
    dl4Node.localMatrix = localMatrices[objectIndex.DL4];

    let dl5Node = new SceneNode();
    dl5Node.name = "dl5Node";
    dl5Node.drawInfo = loadModelProperties(objectIndex.DL5)
    dl5Node.localMatrix = localMatrices[objectIndex.DL5];

    let dl6Node = new SceneNode();
    dl6Node.name = "dl6Node";
    dl6Node.drawInfo = loadModelProperties(objectIndex.DL6)
    dl6Node.localMatrix = localMatrices[objectIndex.DL6];

    let dr1Node = new SceneNode();
    dr1Node.name = "dr1Node";
    dr1Node.drawInfo = loadModelProperties(objectIndex.DR1)
    dr1Node.localMatrix = localMatrices[objectIndex.DR1];

    let dr2Node = new SceneNode();
    dr2Node.name = "dr2Node";
    dr2Node.drawInfo = loadModelProperties(objectIndex.DR2)
    dr2Node.localMatrix = localMatrices[objectIndex.DR2];

    let dr3Node = new SceneNode();
    dr3Node.name = "dr3Node";
    dr3Node.drawInfo = loadModelProperties(objectIndex.DR3)
    dr3Node.localMatrix = localMatrices[objectIndex.DR3];

    let dr4Node = new SceneNode();
    dr4Node.name = "dr4Node";
    dr4Node.drawInfo = loadModelProperties(objectIndex.DR4)
    dr4Node.localMatrix = localMatrices[objectIndex.DR4];

    let dr5Node = new SceneNode();
    dr5Node.name = "dr5Node";
    dr5Node.drawInfo = loadModelProperties(objectIndex.DR5)
    dr5Node.localMatrix = localMatrices[objectIndex.DR5];

    let dr6Node = new SceneNode();
    dr6Node.name = "dr6Node";
    dr6Node.drawInfo = loadModelProperties(objectIndex.DR6)
    dr6Node.localMatrix = localMatrices[objectIndex.DR6];

    let leftFlipperNode = new SceneNode();
    leftFlipperNode.name = "leftFlipperNode";
    leftFlipperNode.drawInfo = loadModelProperties(objectIndex.LEFT_PADDLE)
    leftFlipperNode.localMatrix = localMatrices[objectIndex.LEFT_PADDLE];

    let rightFlipperNode = new SceneNode();
    rightFlipperNode.name = "rightFlipperNode";
    rightFlipperNode.drawInfo = loadModelProperties(objectIndex.RIGHT_PADDLE)
    rightFlipperNode.localMatrix = localMatrices[objectIndex.RIGHT_PADDLE];

    let leftButtonNode = new SceneNode();
    leftButtonNode.name = "leftButtonNode";
    leftButtonNode.drawInfo = loadModelProperties(objectIndex.LEFT_BUTTON)
    leftButtonNode.localMatrix = localMatrices[objectIndex.LEFT_BUTTON];

    let rightButtonNode = new SceneNode();
    rightButtonNode.name = "rightButtonNode";
    rightButtonNode.drawInfo = loadModelProperties(objectIndex.RIGHT_BUTTON)
    rightButtonNode.localMatrix = localMatrices[objectIndex.RIGHT_BUTTON];

    let pullerNode = new SceneNode();
    pullerNode.name = "pullerNode";
    pullerNode.drawInfo = loadModelProperties(objectIndex.PULLER)
    pullerNode.localMatrix = localMatrices[objectIndex.PULLER];

    let bumper1Node = new SceneNode();
    bumper1Node.name = "bumper1Node";
    bumper1Node.drawInfo = loadModelProperties(objectIndex.BUMPER1)
    bumper1Node.localMatrix = localMatrices[objectIndex.BUMPER1];

    let bumper2Node = new SceneNode();
    bumper2Node.name = "bumper2Node";
    bumper2Node.drawInfo = loadModelProperties(objectIndex.BUMPER2)
    bumper2Node.localMatrix = localMatrices[objectIndex.BUMPER2];

    let bumper3Node = new SceneNode();
    bumper3Node.name = "bumper3Node";
    bumper3Node.drawInfo = loadModelProperties(objectIndex.BUMPER3)
    bumper3Node.localMatrix = localMatrices[objectIndex.BUMPER3];

    graph = [
        ballNode,
        bodyNode,
        bumper1Node,
        bumper2Node,
        bumper3Node,
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
        leftButtonNode,
        rightButtonNode,
        leftFlipperNode,
        rightFlipperNode,
        pullerNode
    ];

    //define relationships
    graph.forEach(function (node) {
        if (node.name !== "body")
            node.setParent(bodyNode);
    });
    bodyNode.updateWorldMatrix();
    graphRoot = bodyNode;
}


function loadModelProperties(index) {

    //Here we extract the position of the vertices, the normals, the indices, and the uv coordinates
    return {
        vertices: meshes[index].vertices,
        normals: meshes[index].vertexNormals,
        indices: meshes[index].indices,
        texCords: index >= 5 && index <= 16 ? UVmap["0"] : meshes[index].textures
    }
}

function loadTextures() {

    texture = gl.createTexture();

    let image = new Image();
    image.src = BASE_DIR + ASSETS_TEXTURE_DIR;
    image.onload = function () {
        console.log(texture);
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
        positionAttributeLocation: gl.getAttribLocation(programArray[currShader], "a_position"),
        normalsAttribLocation: gl.getAttribLocation(programArray[currShader], "inNormal"),
        uvAttributeLocation: gl.getAttribLocation(programArray[currShader], "a_uv"),
        nMatrixLocation: gl.getUniformLocation(programArray[currShader], "nMatrix"),
        matrixLocation: gl.getUniformLocation(programArray[currShader], "matrix"),
        worldMatrixLocation: gl.getUniformLocation(programArray[currShader], "world_matrix"),
        textLocation: gl.getUniformLocation(programArray[currShader], "u_texture"),
        ambientLocation: gl.getUniformLocation(programArray[currShader], 'ambientLightColor'),
        ambientLightInfluence: gl.getUniformLocation(programArray[currShader], 'ambientLightInfluence'),
        lightType: gl.getUniformLocation(programArray[currShader], 'lightType'),
        lightColor: gl.getUniformLocation(programArray[currShader], 'lightColor'),
        lightDirection: gl.getUniformLocation(programArray[currShader], 'lightDirection'),
        lightPosition: gl.getUniformLocation(programArray[currShader], 'lightPosition'),
        eyePosition: gl.getUniformLocation(programArray[currShader], 'eyePosition'),
        specularReflLocation: gl.getUniformLocation(programArray[currShader], 'specularReflection'),
        mSpecColorLocation: gl.getUniformLocation(programArray[currShader], 'mSpecColor'),
        mSpecPowerLocation: gl.getUniformLocation(programArray[currShader], 'mSpecPower'),
        diffColorLocation: gl.getUniformLocation(programArray[currShader], 'mDiffColor'),
        decayLocation: gl.getUniformLocation(programArray[currShader], 'decay')
    }
}

function bindModelProperties() {

    graph.forEach(function (node) {

        node.drawInfo.vao = gl.createVertexArray();
        gl.bindVertexArray(node.drawInfo.vao);

        //vertexes
        bindBuffer(glslLocations.positionAttributeLocation, node.drawInfo.vertices, 3);

        //normals
        bindBuffer(glslLocations.normalsAttribLocation, node.drawInfo.normals, 3);

        //uv texture
        bindBuffer(glslLocations.uvAttributeLocation, node.drawInfo.texCords, 2);

        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(node.drawInfo.indices), gl.STATIC_DRAW);
    });

}

function bindBuffer(glslLocation, array, size) {

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(glslLocation);
    gl.vertexAttribPointer(glslLocation, size, gl.FLOAT, false, 0, 0);
}

window.onload = init;

window.addEventListener("keydown", handleDown, false);
window.addEventListener("keyup", handleUp, false);

