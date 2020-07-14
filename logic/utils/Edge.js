class Edge {

    constructor(start, end) {

        let dist = end.sub(start);
        this.length = dist.getModule();
        this.direction = dist.getDir();
        this.start = start;
    }

}
