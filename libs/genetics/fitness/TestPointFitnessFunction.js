const BaseFitnessFunction = require("./BaseFitnessFunction").default;

class TestPointFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    let points = agent.bezierCurve.bezzierPoints,
      step = 1 / points,
      min = 1;

    let sumX = 0,
      sumY = 0,
      avgX,
      avgY;
    for (let t = 0; t < 1; t += step) {
      let [x, y] = agent.bezierCurve.getPoint(t);
      sumX += Math.abs(x - 760);
      sumY += Math.abs(y - 760);
    }

    avgX = sumX / points;
    avgY = sumY / points;

    return (
      ((avgX + avgY) / 2) * this.weight + this._evaluate({ agent, edgeMatrix })
    );
  }
}

module.exports.default = TestPointFitnessFunction;
