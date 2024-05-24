title = "spacedodge";

description = `
  [Tap] to
  change
  direction
`;

characters = [
  `
  ll
  ll
rrllrr
rrllrr
rrllrr
rr  rr
`,
  `
ll  ll
ll  ll
ccllcc
cc  cc
 cccc
`,
];

options = {
  isPlayingBgm: false,
  isReplayEnabled: true,
};

/** @type {{loc: Vector, dir}} */
let ship;

/** @type {Vector[]} */
let enemyShips;
let nextEnemyDist;
let shipSpeed;

function update() {
  if (!ticks) {
    enemyShips = [vec(50, 5)];
    ship = { loc: vec(50, 80) };
    nextEnemyDist = 7;
    shipSpeed = 0.2;
  }

  let scr = difficulty * 0.15;

  if (input.isJustPressed) {
    play("tone");
  }

  if (input.isJustReleased) {
    shipSpeed *= -1;
  } else {
    // get back to normal
  }
  ship.loc.x += shipSpeed;

  char("a", ship.loc);
  // cord.angle += difficulty * 0.05

  // checking collision with ends of screen and enemy ships
  if (ship.loc.x > 95 || ship.loc.x < 5) {
    play("explosion");
    end();
  }

  remove(enemyShips, (p) => {
    //checking collision with enemy ship
    p.y += scr;
    color("black");
    if (char("b", p).isColliding.char.a) {
      end();
    }
    if (p.y > 102) {
      addScore(1);
    }
    return p.y > 102;
  });

  nextEnemyDist -= scr;

  while (nextEnemyDist < 0) {
    enemyShips.push(vec(rnd(5, 95), -2 - nextEnemyDist));
    nextEnemyDist += rnd(5, 15);
  }
}
