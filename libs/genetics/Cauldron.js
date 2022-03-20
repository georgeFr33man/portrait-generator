const Agent = require("./Agent").default;
const BezierCurve = require("../entities").default.BezierCurve;

class Cauldron {
  // @public
  agents;

  /**
   * @param {array<Agent>}[agents]
   */
  constructor(agents) {
    this.agents = agents;
  }

  /**
   * @param {array<BezierCurve>}[curves]
   * @return array<Agent>
   */
  static createAgentsFromCurves(curves) {
    let agents = [];
    curves.forEach((curve) => agents.push(new Agent(curve)));

    return agents;
  }
}

module.exports.default = Cauldron;
