const Agent = require("../Agent").default;
const JimpImage = require("../../entities/JimpImage").default;
const IFitnessFunction = require("./IFitnessFunction").default;

class BaseFitnessFunction extends IFitnessFunction {
  weight;
  decorator;

  /**
   * @param {number}[weight]
   * @param {BaseFitnessFunction|null}[decorator]
   */
  constructor(weight = 1, decorator) {
    super(weight, decorator);
    this.weight = weight;
    this.decorator = decorator;
  }

  /**
   * @param {Agent}[agent]
   * @param {JimpImage}[edgeMatrix]
   * @return {number}
   */
  evaluate({ agent, edgeMatrix }) {
    return 0 * this.weight + this._evaluate({ agent, edgeMatrix });
  }

  /**
   * @return number
   */
  _evaluate({ agent, edgeMatrix }) {
    if (this.decorator) {
      return this.decorator.evaluate({ agent, edgeMatrix });
    }

    return 0;
  }
}

module.exports.default = BaseFitnessFunction;
