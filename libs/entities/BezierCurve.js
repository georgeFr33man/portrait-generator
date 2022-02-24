const bezier = require("bezier-curve");
const { rand } = require("./../functions/mathFunctions").default;

class BezierCurve {
  // @public
  start;
  end;
  points;

  constructor(start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, points = []) {
    this.start = start;
    this.end = end;
    this.points = points;
  }

  static getRandomCurve({ xMax, yMax, nofPoints = 1 }) {
    let start = { x: rand(xMax), y: rand(yMax) },
      end = { x: rand(xMax), y: rand(yMax) },
      points = [];

    for (let i = 0; i < nofPoints; i++) {
      points.push({ x: rand(xMax), y: rand(yMax) });
    }

    return new BezierCurve(start, end, points);
  }

  getPoint(t) {
    let points = [];
    this.points.forEach((p) => points.push([p.x, p.y]));

    return bezier(t, [
      [this.start.x, this.start.y],
      ...points,
      [this.end.x, this.end.y],
    ]);
  }
}

module.exports.default = BezierCurve;
