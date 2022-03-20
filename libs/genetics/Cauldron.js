const Agent = require("./Agent").default;
const JimpImage = require("../entities/JimpImage").default;
const BezierCurve = require("../entities").default.BezierCurve;
const { rand, normalize } = require("../functions/mathFunctions").default;
const { createString, replaceStringFromIndex } =
  require("../functions/stringFunctions").default;
const { white } = require("../utils/colors").default;
const { debug } = require("../utils/logger").default;

const DRAW_AGENTS_MAX_TRIES = require("./config").default.DRAW_AGENTS_MAX_TRIES;
const DRAW_AGENT_DEFAULT_CHANCE =
  require("./config").default.DRAW_AGENT_DEFAULT_CHANCE;
const CROSS_OVER_POINTS = require("./config").default.CROSS_OVER_POINTS;

class Cauldron {
  // @public
  agents;
  crossOverChance;
  mutationChance;

  // @private
  #bestAgent;
  #worstAgent;

  /**
   * @param {[Agent]}[agents]
   * @param {number}[crossOverChance]
   * @param {number}[mutationChance]
   * @param {BaseFitnessFunction}[fitnessFunctions]
   */
  constructor(
    agents,
    crossOverChance = 0.3,
    mutationChance = 0.1,
    ...fitnessFunctions
  ) {
    this.agents = agents;
    this.crossOverChance = crossOverChance;
    this.mutationChance = mutationChance;
  }

  /**
   * Start mixing algorithm for given number of mixes or mixing time.
   * @param {JimpImage}[edgeMatrix]
   * @param {[{func: Function, weight: number}]}[fitnessFuncs]
   * @param {int}[nofMixes]
   * @param {int}[maxMixingTime] - In milliseconds
   */
  doMixing({ edgeMatrix, fitnessFuncs, nofMixes = 1000, maxMixingTime = 0 }) {
    let fitnessFunction = this.#createFitnessFunction(fitnessFuncs);
    if (maxMixingTime !== 0) {
      let elapsedTime = 0;
      let start = Date.now();
      while (elapsedTime < maxMixingTime) {
        this.mix({ edgeMatrix, fitnessFunction });
        elapsedTime = Date.now() - start;
      }
    } else {
      for (let i = 0; i < nofMixes; i++) {
        this.mix({ edgeMatrix, fitnessFunction });
      }
    }
  }

  /**
   * @param {JimpImage}[edgeMatrix]
   * @param {BaseFitnessFunction}[fitnessFunction]
   */
  mix({ edgeMatrix, fitnessFunction }) {
    // Evaluate agents.
    this.agents.forEach((agent) => {
      agent.fitnessScore = fitnessFunction.evaluate({ agent, edgeMatrix });
      this.#bestAgent =
        !this.#bestAgent || agent.fitnessScore > this.#bestAgent.fitnessScore
          ? agent
          : this.#bestAgent;
      this.#worstAgent =
        !this.#worstAgent || agent.fitnessScore < this.#worstAgent.fitnessScore
          ? agent
          : this.#worstAgent;
    });
    this.#normalizeAgents();

    // Crossover
    let usedIndexes = [];
    let agent2 = null,
      agent2Index = null;
    this.agents.forEach((agent, index) => {
      if (!usedIndexes.includes(index)) {
        usedIndexes.push(index);

        // select agent for crossing over with
        [agent2, agent2Index] = this.#drawAgent(usedIndexes);
        usedIndexes.push(agent2Index);

        // do crossover
        if (rand(1, 0) <= this.crossOverChance) {
          this.crossover(agent, agent2);
        }

        // clear out.
        agent2 = null;
        agent2Index = null;
      }
    });

    // Mutations
    this.agents.forEach((agent) => this.mutate(agent));
  }

  mutate(agent) {
    let gr = agent.geneticRepresentation.split("");
    gr = gr.map((bit) => {
      if (rand(1, 0) <= this.mutationChance) {
        return bit === "0" ? "1" : "0";
      }

      return bit;
    });

    agent.geneticRepresentation = gr.join("");
  }

  crossover(agent1, agent2) {
    let gr1 = agent1.geneticRepresentation;
    let gr2 = agent2.geneticRepresentation;

    let maxCuttingPoint = gr1.length > gr2.length ? gr1.length : gr2.length;
    let cuttingPoints = [];

    for (let i = 0; i < CROSS_OVER_POINTS; i++) {
      cuttingPoints.push(Math.floor(rand(maxCuttingPoint, 0)));
    }
    cuttingPoints.sort((a, b) => a - b);

    for (let k = 0; k < cuttingPoints.length; k++) {
      let cuttingPoint = cuttingPoints[k];
      let sliceLen = maxCuttingPoint - cuttingPoint;
      let cut1 = gr1.slice(cuttingPoint);
      let cut2 = gr2.slice(cuttingPoint);

      if (cut1.length < sliceLen) {
        cut1 = createString("0", sliceLen - cut1.length) + cut1;
      }
      if (cut2.length < sliceLen) {
        cut2 = createString("0", sliceLen - cut2.length) + cut2;
      }

      gr1 = replaceStringFromIndex(gr1, cut2, cuttingPoint);
      gr2 = replaceStringFromIndex(gr2, cut1, cuttingPoint);
    }

    agent1.geneticRepresentation = gr1;
    agent2.geneticRepresentation = gr2;
  }

  #drawAgent(usedIndexes) {
    let tries = 0,
      index = 1,
      drawnAgent = null,
      agent = null;

    // Try to draw an agent.
    while (tries < DRAW_AGENTS_MAX_TRIES && drawnAgent === null) {
      // It can start from 1, because 0 is always used from the beginning.
      for (index; index < this.agents.length; index++) {
        if (usedIndexes.includes(index)) continue;
        agent = this.agents[index];
        if (rand(1, 0) <= DRAW_AGENT_DEFAULT_CHANCE * agent.fitnessScore) {
          drawnAgent = agent;
          break;
        }
      }

      tries++;
    }

    // If agent has not been drawn, draw the first available one.
    if (drawnAgent === null) {
      for (index = 1; index < this.agents.length; index++) {
        if (usedIndexes.includes(index)) continue;
        agent = this.agents[index];
        drawnAgent = agent;
        break;
      }
    }

    return [drawnAgent, index];
  }

  #normalizeAgents() {
    if (this.#bestAgent && this.#worstAgent) {
      let bestVal = this.#bestAgent.fitnessScore;
      let worstVal = this.#worstAgent.fitnessScore;
      this.agents.forEach((agent) => {
        agent.fitnessScore = normalize(agent.fitnessScore, bestVal, worstVal);
      });
    }
  }

  /**
   *
   * @param {JimpImage}[image]
   * @param {int}[points]
   * @param {int}[color]
   * @param {boolean}[lerpColor]
   */
  spill({ image, points = 1000, color = white, lerpColor = true }) {
    this.agents.forEach((agent, index) => {
      debug("Agent: " + index / (this.agents.length - 1) + "%");
      image.drawBezier({
        bezierCurve: agent.bezierCurve,
        points,
        color,
        lerpColor,
      });
    });
  }

  /**
   * @param {[{func: Function, weight: number}]}[fitnessFuncs]
   * @return BaseFitnessFunction
   */
  #createFitnessFunction(fitnessFuncs) {
    let stack = null;
    fitnessFuncs.forEach((fitness) => {
      if (stack === null) {
        stack = new fitness.func(fitness.weight);
      } else {
        stack = new fitness.func(fitness.weight, stack);
      }
    });

    return stack;
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

  /**
   *
   * @param xMax
   * @param yMax
   * @param nofPointsMax
   * @param nofPointsMin
   * @param thicknessMax
   * @param thicknessMin
   * @param size
   * @returns {Array<Agent>}
   */
  static generateAgentsPopulation({
    xMax,
    yMax,
    nofPointsMax = 2,
    nofPointsMin = 2,
    thicknessMax = 1,
    thicknessMin = 1,
    size = 100,
  }) {
    let curves = [];
    for (let i = 0; i < size; i++) {
      curves.push(
        BezierCurve.getRandomCurve({
          xMax,
          yMax,
          nofPoints: rand(nofPointsMax, nofPointsMin),
          thickness: rand(thicknessMax, thicknessMin),
        })
      );
    }

    return this.createAgentsFromCurves(curves);
  }
}

module.exports.default = Cauldron;
