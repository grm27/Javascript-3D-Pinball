class Paddle {
    
    static IDLE_INCLINATION = -0.5236;
    static MAX_INCLINATION = 0.5236;
    static SWEEP_TIME = 0.12;
    static STEP = (Paddle.MAX_INCLINATION - Paddle.IDLE_INCLINATION) / Paddle.SWEEP_TIME;

    active = false;
    isMoving = false;
    angleRatio = 0;
    
    constructor(position, side, shock, size) {

        this.position = position;
        this.side = side;
        this.shock = shock;
        this.size = size;
    }
    
    getDir() {
        return Vec2.buildUnit(this.getInclination());
    }

    getEdge() {
        return this.getDir().scalarProduct(this.size).add(this.position);
    }

    getInclination() {
        let angle = Paddle.IDLE_INCLINATION + (Paddle.MAX_INCLINATION - Paddle.IDLE_INCLINATION) * this.angleRatio;
        if(this.side === "left")
            return angle;
        else
            return Math.PI - angle;
    }
    
    getPulse() {
        if (!this.isMoving)
            return 0;
        if (this.side === "left" ^ this.active)
            return -Paddle.STEP;
        return Paddle.STEP;
    }

    update(deltaT) {
        let pulseDirection = this.active ? 1 : -1;
        let rawAngleRatio = this.angleRatio + pulseDirection * deltaT / Paddle.SWEEP_TIME;
        if (rawAngleRatio >= 0 && rawAngleRatio <= 1) {
            this.angleRatio = rawAngleRatio;
            this.isMoving = true;
        }
        else this.isMoving = false;
    }
}