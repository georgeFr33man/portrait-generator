const BaseFitnessFunction = require("./BaseFitnessFunction").default;
const { white } = require("../../utils/colors").default;

class StartPointFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    let curveStart = agent.bezierCurve.start;
    let startPositionColor = edgeMatrix.getColorOnPosition(
      curveStart.x,
      curveStart.y,
      agent.bezierCurve.thickness
    );

    return (
      (startPositionColor / white) * this.weight +
      this._evaluate({ agent, edgeMatrix })
    );
  }
}

module.exports.default = StartPointFitnessFunction;
