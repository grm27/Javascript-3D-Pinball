class Paddle {

    constructor(position, side, shock, size) {

        this.position = position;
        this.side = side;
        this.shock = shock;
        this.size = size;
        this.active = false;
        this.isMoving = false;
        this.anglePerc = 0;
    }

    getDir() {
        return Vec2.buildUnit(this.getInclination());
    }

    getInclination() {
        let angle = IDLE_INCLINATION + (MAX_INCLINATION - IDLE_INCLINATION) * this.anglePerc;
        if (this.side === "left")
            return angle;
        else
            return Math.PI - angle;
    }

    getPulse() {

        if (this.isMoving) {
            if (this.side === "left" ^ this.active)
                return -STEP;
            return STEP;
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

}