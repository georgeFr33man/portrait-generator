const Agent = require("../Agent");
const JimpImage = require("../../entities/JimpImage");
const IFitnessFunction = require("./IFitnessFunction");

/**
 * @property {number} weight - the weight of the fitness function evaluation
 * @property {BaseFitnessFunction} decorator - the next fitness function
 */
class BaseFitnessFunction extends IFitnessFunction {
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

module.exports = BaseFitnessFunction;
