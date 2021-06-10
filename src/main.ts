import './style.css';
import paper, { Path, Point, Color, Size } from 'paper';
import { Ball } from './Ball';

type Id =
  | 'wind'
  | 'gravity'
  | 'timespeed'
  | 'paused'
  | 'velocityX'
  | 'velocityY'
  | 'positionX'
  | 'positionY';

const elList: Id[] = [
  'wind',
  'gravity',
  'timespeed',
  'paused',
  'velocityX',
  'velocityY',
  'positionX',
  'positionY',
];
const elMap: Record<Id, HTMLDivElement> = {} as Record<Id, HTMLDivElement>;

elList.forEach(
  (id) => (elMap[id] = document.getElementById(id) as HTMLDivElement),
);

const main = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  paper.setup(canvas);

  const ground = new Path.Rectangle(new Point(0, vh - 300), new Size(vw, 30));
  ground.fillColor = new Color('#000000');

  const ball = new Ball(vw / 2, 50, 20, '#000000', ground.bounds);

  let paused = false;
  let timeSpeed = 1;
  let wind = false;

  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'a':
        paused = !paused;
        if (!paused) {
          requestAnimationFrame(gameLoop);
        }
        break;
      case 'w':
        timeSpeed *= 2;
        break;
      case 's':
        timeSpeed /= 2;
        break;
      case 'd':
        wind = !wind;
        break;
    }
  });

  const gameLoop = () => {
    const gravity = new Point(0, 1);
    ball.applyForce(gravity);
    if (wind) {
      ball.applyForce(new Point(0.2, 0));
    }
    ball.update(timeSpeed);

    // update display
    elList.forEach((id) => {
      const renderText = (str: unknown) => {
        console.log('elMap', elMap);
        elMap[id].innerHTML = `${id}: ${String(str)}`;
      };
      switch (id) {
        case 'wind':
          renderText(wind);
          break;
        case 'paused':
          renderText(paused);
          break;
        case 'timespeed':
          renderText(timeSpeed);
          break;
        case 'velocityX':
          renderText(ball.vel.x);
          break;
        case 'velocityY':
          renderText(ball.vel.y);
          break;
        case 'positionX':
          renderText(ball.value.position.x);
          break;
        case 'positionY':
          renderText(ball.value.position.y);
          break;
        case 'gravity':
          renderText(gravity);
          break;
      }
    });

    if (!paused) {
      requestAnimationFrame(gameLoop);
    }
  };
  requestAnimationFrame(gameLoop);
};

main();
