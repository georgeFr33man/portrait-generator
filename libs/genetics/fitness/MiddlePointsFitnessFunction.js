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
      points = 10,
      step = 1 / points;

    for (let t = 0; t < 1; t += step) {
      let [x, y] = agent.bezierCurve.getPoint(t);
      sumOfCoverage +=
        edgeMatrix.getColorOnPosition(x, y, agent.bezierCurve.thickness) /
        white;
    }

    let avg = sumOfCoverage / points;

    return avg * this.weight + this._evaluate({ agent, edgeMatrix });
  }
}

module.exports.default = MiddlePointsFitnessFunction;
