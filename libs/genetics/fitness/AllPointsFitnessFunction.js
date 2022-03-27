const BaseFitnessFunction = require("./BaseFitnessFunction").default;
const { white } = require("../../utils/colors").default;

class AllPointsFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    let points = [
        agent.bezierCurve.start,
        ...agent.bezierCurve.points,
        agent.bezierCurve.end,
      ],
      sum = 0;

    points.forEach((point) => {
      sum += edgeMatrix.getColorOnPosition(point.x, point.y) / white;
    });

    let avg = sum / points.length;

    return avg * this.weight + this._evaluate({ agent, edgeMatrix });
  }
}

module.exports.default = AllPointsFitnessFunction;
