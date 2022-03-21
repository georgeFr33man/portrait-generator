const BaseFitnessFunction = require("./BaseFitnessFunction").default;
const { white } = require("../../utils/colors").default;

class EndPointFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    let curveEnd = agent.bezierCurve.end;
    let endPositionColor = edgeMatrix.getColorOnPosition(
      curveEnd.x,
      curveEnd.y,
      agent.bezierCurve.thickness
    );

    return (
      (endPositionColor / white) * this.weight +
      this._evaluate({ agent, edgeMatrix })
    );
  }
}

module.exports.default = EndPointFitnessFunction;
