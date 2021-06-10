import paper, { Path, Point, Color } from 'paper';

const vw = window.innerWidth;

export class Ball {
  value: paper.Path.Circle;
  vel: paper.Point;
  acc: paper.Point;
  constructor(
    x: number,
    y: number,
    public r: number,
    color: string,
    public groundBound: paper.Rectangle,
  ) {
    this.value = new Path.Circle(new Point(x, y), r);
    this.vel = new Point(0, 0);
    this.acc = new Point(0, 0);
    this.value.fillColor = new Color(color);
  }

  applyForce(f: paper.Point) {
    this.acc = this.acc.add(f.divide(this.r / 10));
  }

  update(timeSpeed = 1) {
    this.vel = this.vel.add(this.acc.multiply(timeSpeed));
    this.value.position = this.value.position.add(this.vel.multiply(timeSpeed));

    const { x, y } = this.value.position;
    const { top } = this.groundBound;

    if (y >= top - this.r) {
      this.setPosY(top - this.r);
      this.setVelY(this.vel.y * -1);
    }

    if (x >= vw - this.r) {
      this.setPosX(vw - this.r);
      this.setVelX(this.vel.x * -1);
    } else if (x <= this.r) {
      this.setPosX(this.r);
      this.setVelX(this.vel.x * -1);
    }
    this.acc.set(0, 0);
  }

  setPosX(x: number) {
    this.value.position.set(x, this.value.position.y);
  }

  setPosY(y: number) {
    this.value.position.set(this.value.position.x, y);
  }

  setVelX(x: number) {
    this.vel.set(x, this.vel.y);
  }

  setVelY(y: number) {
    this.vel.set(this.vel.x, y);
  }
}
