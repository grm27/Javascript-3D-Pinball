
let SceneNode = function() {
    this.children = [];
    this.localMatrix = utils.identityMatrix();
    this.worldMatrix = utils.identityMatrix();
    this.lightDir = new Array(3);
    this.lightPos = new Array(3);
    this.observerObj = new Array(3);
};

SceneNode.prototype.setParent = function(parent) {
    // remove us from our parent
    if (this.parent) {
        var ndx = this.parent.children.indexOf(this);
        if (ndx >= 0) {
            this.parent.children.splice(ndx, 1);
        }
    }

    // Add us to our new parent
    if (parent) {
        parent.children.push(this);
    }
    this.parent = parent;
};

SceneNode.prototype.updateWorldMatrix = function(parentWorldMatrix) {
    if (parentWorldMatrix) {
        // a matrix was passed in so do the math and
        // store the result in `this.worldMatrix`.
        this.worldMatrix = utils.multiplyMatrices(parentWorldMatrix, this.localMatrix);
    } else {
        // no matrix was passed in so just copy localMatrix to worldMatrix
        this.worldMatrix = [...this.localMatrix];
    }

    // now process all the children
    var worldMatrix = this.worldMatrix;
    this.children.forEach(function(child) {
        child.updateWorldMatrix(worldMatrix);
    });
};

