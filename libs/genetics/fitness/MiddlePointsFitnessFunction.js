const BaseFitnessFunction = require("./BaseFitnessFunction").default;
const { white } = require("../../utils/colors").default;

class MiddlePointsFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    let sumOfCoverage = 0,
      points = agent.bezierCurve.bezzierPoints,
      step = 1 / points;

    for (let t = 0; t < 1; t += step) {
      let [x, y] = agent.bezierCurve.getPoint(t);
      let color = edgeMatrix.getColorOnPosition(x, y);
      sumOfCoverage += color / white;
    }

    let avg = sumOfCoverage / points;

    return avg * this.weight + this._evaluate({ agent, edgeMatrix });
  }
}

module.exports.default = MiddlePointsFitnessFunction;
