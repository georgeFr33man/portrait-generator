const bezier = require("bezier-curve");
const { rand } = require("./../functions/mathFunctions");

/**
 * @property {{x: number, y: number}} start - the starting point for the curve
 * @property {{x: number, y: number}} end - the ending point for the curve
 * @property {int} points - the number of points for the curve
 * @property {int} thickness - the thickness of the curve
 * @property {int} bezzierPoints - the number of points to evaluate curve with
 */
class BezierCurve {
  /**
   * @param {{x: number, y: number}} [start]
   * @param {{x: number, y: number}} [end]
   * @param {array} [points]
   * @param {int} [thickness]
   * @param {int} [bezzierPoints]
   */
  constructor(
    start = { x: 0, y: 0 },
    end = { x: 0, y: 0 },
    points = [],
    thickness = 1,
    bezzierPoints = 100
  ) {
    this.start = start;
    this.end = end;
    this.points = points;
    this.thickness = thickness;
    this.bezzierPoints = bezzierPoints;
  }

  /**
   * @param {int} [xMax]
   * @param {int} [yMax]
   * @param {int} [nofPoints]
   * @param thickness
   * @param {int}[bezzierPoints]
   * @returns {BezierCurve}
   */
  static getRandomCurve({
    xMax,
    yMax,
    nofPoints = 1,
    thickness = 1,
    bezzierPoints = 100,
  }) {
    let start = { x: rand(xMax), y: rand(yMax) },
      end = { x: rand(xMax), y: rand(yMax) },
      points = [];

    for (let i = 0; i < nofPoints; i++) {
      points.push({ x: rand(start.x, end.x), y: rand(start.y, end.y) });
    }

    return new BezierCurve(start, end, points, thickness, bezzierPoints);
  }

  /**
   * @param {number} [t] Range (0 - 1).
   * @returns {Object} {x: number, y: number}
   */
  getPoint(t) {
    let points = [];
    this.points.forEach((p) => points.push([p.x, p.y]));

    return bezier(t, [
      [this.start.x, this.start.y],
      ...points,
      [this.end.x, this.end.y],
    ]);
  }

  /**
   * @param {{x: number, y: number}}[start]
   * @param {{x: number, y: number}}[end]
   * @param {int|null}[thickness]
   * @param {[{x: number, y: number}]}[points]
   */
  setProperties({
    start = { x: 0, y: 0 },
    end = { x: 0, y: 0 },
    thickness = null,
    points = [],
  }) {
    this.start = start;
    this.end = end;
    this.thickness = thickness ?? this.thickness;
    this.points = points;
  }
}

module.exports = BezierCurve;
