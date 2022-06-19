const BaseFitnessFunction = require("./BaseFitnessFunction");

class TestPointFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    let points = agent.bezierCurve.bezzierPoints,
      step = 1 / points;

    let sumX = 0,
      sumY = 0,
      avgX,
      avgY;

    for (let t = 0; t < 1; t += step) {
      let [x, y] = agent.bezierCurve.getPoint(t);
      if (!isNaN(x) && !isNaN(y)) {
        sumX += Math.abs(x - 100);
        sumY += Math.abs(y - 250);
      }
    }

    avgX = sumX / points;
    avgY = sumY / points;

    return (
      ((avgX + avgY) / 2) * this.weight + this._evaluate({ agent, edgeMatrix })
    );
  }
}

module.exports = TestPointFitnessFunction;
