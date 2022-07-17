import {binary} from "../functions/converters.js";
import {chunkString} from "../functions/stringFunctions.js";
import lodash from "lodash";

const { binaryToDec, decToBinary } = binary;

import {ALLELE_LENGTH} from "./config.js";

/**
 * @property {BezierCurve} #bezierCurve - bezzier curve object
 * @property {number} #fitnessScore - the fitness score of the agent
 * @property {string} #geneticRepresentation - the genetic representation of the Agent store as string
 */
export default class Agent {
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
   * @returns {BezierCurve}
   */
  get bezierCurve() {
    return this.#bezierCurve;
  }

  /**
   * @returns {number}
   */
  get fitnessScore() {
    return this.#fitnessScore;
  }

  /**
   * @param {number} [val]
   */
  set fitnessScore(val) {
    this.#fitnessScore = val;
  }

  /**
   * @returns {string}
   */
  get geneticRepresentation() {
    return this.#geneticRepresentation;
  }

  /**
   * @param {string} [geneticCode]
   */
  set geneticRepresentation(geneticCode) {
    this.#geneticRepresentation = geneticCode;
    this.#updateBezierCurve(geneticCode);
  }

  #buildGeneticRepresentation() {
    let startX = decToBinary(this.#bezierCurve.start.x, ALLELE_LENGTH);
    let startY = decToBinary(this.#bezierCurve.start.y, ALLELE_LENGTH);
    let endX = decToBinary(this.#bezierCurve.end.x, ALLELE_LENGTH);
    let endY = decToBinary(this.#bezierCurve.end.y, ALLELE_LENGTH);
    // let thickness = decToBinary(this.#bezierCurve.thickness, ALLELE_LENGTH);

    let points = [];
    this.#bezierCurve.points.forEach((point) => {
      points.push(decToBinary(point.x, ALLELE_LENGTH));
      points.push(decToBinary(point.y, ALLELE_LENGTH));
    });

    this.#geneticRepresentation =
      // startX + startY + endX + endY + thickness + points.join("");
      startX + startY + endX + endY + points.join("");
  }

  /**
   * @param {string} [geneticCode]
   */
  #updateBezierCurve(geneticCode) {
    let chunks = chunkString(geneticCode, ALLELE_LENGTH);
    chunks = chunks.map((el) => binaryToDec(el));

    let start = { x: chunks.shift(), y: chunks.shift() },
      end = { x: chunks.shift(), y: chunks.shift() },
      // thickness = chunks.shift(),
      points = lodash.chunk(chunks, 2).map((chunk) => {
        return { x: chunk[0], y: chunk[1] };
      });

    this.#bezierCurve.setProperties({ start, end, points });
  }
}
