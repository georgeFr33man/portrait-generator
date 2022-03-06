const BezierCurve = require("../entities/BezierCurve").default;
const { binaryToDec, decToBinary } = require("../functions/converters").binary;

const ALLELE_LENGTH = 64; // todo: make file with consts for genetics

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

    /**
     * @returns {string}
     */
    get geneticRepresentation() {return this.#geneticRepresentation}

    /**
     * @param {string} [geneticCode]
     */
    set geneticRepresentation(geneticCode) {
        this.#geneticRepresentation = geneticCode;
        this.#updateBezierCurve(geneticCode)
    }

    #buildGeneticRepresentation() {
        let start = decToBinary(this.#bezierCurve.start, ALLELE_LENGTH);
        let end = decToBinary(this.#bezierCurve.end, ALLELE_LENGTH);
        let thickness = decToBinary(this.#bezierCurve.thickness, ALLELE_LENGTH);
        let points = [];

        this.#bezierCurve.points.forEach(point => {
            points.push(decToBinary(point, ALLELE_LENGTH));
        })

        this.#geneticRepresentation = start +
            end +
            thickness +
            points.toString();
    }

    /**
     * @param {string} [geneticCode]
     */
    #updateBezierCurve(geneticCode) {
        let alleles = geneticCode.split(' '),
            numberOfChunks = alleles.length / ALLELE_LENGTH,
            chunks = [];

        for (let i = 0, o = 0; i < numberOfChunks; i++, o += ALLELE_LENGTH) {
            chunks[i] = alleles.substring(o, ALLELE_LENGTH);
        }

        chunks.map(el => binaryToDec(el));

        let start = chunks.shift(),
            end = chunks.shift(),
            thickness = chunks.shift(),
            points = chunks;

        this.#bezierCurve.setProperties({start, end, thickness, points})
    }
}

module.exports.default = Agent;