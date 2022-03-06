const BezierCurve = require("../entities/BezierCurve").default;

class Agent
{
    // @private
    #bezierCurve;
    #fitnessScore;
    #geneticRepresentation;

    /**
     * @param {BezierCurve} [bezierCurve]
     */
    constructor(bezierCurve) {
        this.#bezierCurve = bezierCurve;
        this.#buildGeneticRepresentation();
    }

    /**
     * @returns {number}
     */
    get fitnessScore() {return this.#fitnessScore}

    /**
     * @param {number} [val]
     */
    set fitnessScore(val) {this.#fitnessScore = val;}

    #buildGeneticRepresentation() {

    }
}

module.exports.default = Agent;