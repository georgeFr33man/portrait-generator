const Picture = require("../entities/Picture").default;

class Agent
{
    // @private
    #bezierCurve;
    #fitnessScore;

    /**
     * @param {Picture} [bezierCurve]
     */
    constructor(bezierCurve) {
        this.#bezierCurve = bezierCurve;
    }

    /**
     * @returns {number}
     */
    get fitnessScore() {return this.#fitnessScore}

    /**
     * @param {number} [val]
     */
    set fitnessScore(val) {this.#fitnessScore = val;}


}

module.exports.default = Agent;