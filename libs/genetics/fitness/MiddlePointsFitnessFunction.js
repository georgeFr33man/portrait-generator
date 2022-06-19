const BaseFitnessFunction = require("./BaseFitnessFunction");
const { white, black } = require("../../utils/colors");

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

    for (let t = 0; t <= 1; t += step) {
      let [x, y] = agent.bezierCurve.getPoint(t);
      if (!isNaN(x) && !isNaN(y)) {
        sumOfCoverage +=
          edgeMatrix.getColorOnPosition(x, y, agent.bezierCurve.thickness) /
          white;
      } else {
        sumOfCoverage = 0;
      }
    }

    let avg;
    if (sumOfCoverage === points) {
      avg = 0;
    } else if (sumOfCoverage === 0) {
      avg = 1;
    } else {
      avg = 1 / sumOfCoverage;
    }

    // return avg * this.weight + this._evaluate({ agent, edgeMatrix });
    return avg * this.weight + this._evaluate({ agent, edgeMatrix });
  }
}

module.exports = MiddlePointsFitnessFunction;
