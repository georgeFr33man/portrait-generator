const BaseFitnessFunction = require("./BaseFitnessFunction").default;
const { white } = require("../../utils/colors").default;

class MiddlePointsMinFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    let points = agent.bezierCurve.bezzierPoints,
      step = 1 / points,
      min = 1;

    for (let t = 0; t < 1; t += step) {
      let [x, y] = agent.bezierCurve.getPoint(t);
      let colorValue =
        edgeMatrix.getColorOnPosition(x, y, agent.bezierCurve.thickness) /
        white;
      if (colorValue < min) {
        min = colorValue;
      }
    }

    return min * this.weight + this._evaluate({ agent, edgeMatrix });
  }
}

module.exports.default = MiddlePointsMinFitnessFunction;
