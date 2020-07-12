class Edge {

    constructor(start, end) {

        this.start = start;
        this.end = end;
        this.length = end.sub(start).getModule();
        this.direction = end.sub(start).getDir();
    }

}
