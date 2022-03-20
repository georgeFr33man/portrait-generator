const BaseFitnessFunction = require("./BaseFitnessFunction").default;

class EndPointsFitnessFunction extends BaseFitnessFunction {
  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    // todo: implement functionality.
    return 0 * this.weight + this._evaluate({ agent, edgeMatrix });
  }
}

module.exports.default = EndPointsFitnessFunction;
