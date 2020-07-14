class Paddle {

    static IDLE_INCLINATION = -0.523;
    static MAX_INCLINATION = 0.524;
    static STEP = (Paddle.MAX_INCLINATION - Paddle.IDLE_INCLINATION) / 0.10;

    constructor(position, side, shock, size) {

        this.position = position;
        this.side = side;
        this.shock = shock;
        this.size = size;
    }

    getDir() {
        return Vec2.buildUnit(this.getInclination());
    }

    getInclination() {
        let angle = Paddle.IDLE_INCLINATION + (Paddle.MAX_INCLINATION - Paddle.IDLE_INCLINATION) * this.anglePerc;
        if (this.side === "left")
            return angle;
        else
            return Math.PI - angle;
    }

    getPulse() {

        if (this.isMoving) {
            if (this.side === "left" ^ this.active)
                return -Paddle.STEP;
            return Paddle.STEP;
        }

        return 0;
    }

    step(deltaT) {
        let deltaTeta;

        if (this.active) {
            deltaTeta = deltaT / 0.10;
        } else
            deltaTeta = -deltaT / 0.10;

        let anglePer = this.anglePerc + deltaTeta;

        if (anglePer >= 0 && anglePer <= 1) {
            this.anglePerc = anglePer;
            this.isMoving = true;
        } else
            this.isMoving = false;
    }

    active = false;
    isMoving = false;
    anglePerc = 0;
}