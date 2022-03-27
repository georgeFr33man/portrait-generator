const Agent = require("./Agent").default;
const JimpImage = require("../entities/JimpImage").default;
const BezierCurve = require("../entities").default.BezierCurve;
const { rand, normalize, randInt } =
  require("../functions/mathFunctions").default;
const { replaceStringFromIndex } =
  require("../functions/stringFunctions").default;
const { white, green, getRandomColor } = require("../utils/colors").default;
const { debug, loading } = require("../utils/logger").default;
const { chunkString } = require("../functions/stringFunctions").default;
const { swapIndexes } = require("../functions/misc").default;

const ALLELE_LENGTH = require("./config").default.ALLELE_LENGTH;
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
  constructor(agents, crossOverChance = 0.3, mutationChance = 0.1) {
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
        loading((elapsedTime / maxMixingTime) * 100);
      }
    } else {
      for (let i = 0; i < nofMixes; i++) {
        this.mix({ edgeMatrix, fitnessFunction });
        loading(((i + 1) / nofMixes) * 100);
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
    this.#sortAgents();

    // Crossover
    let usedIndexes = [];
    let agent2 = null,
      agent2Index = null;
    this.agents.forEach((agent, index) => {
      if (!usedIndexes.includes(index)) {
        // select agent for crossing over with
        [agent2, agent2Index] = this.#drawAgent(usedIndexes);
        usedIndexes.push(index);
        usedIndexes.push(agent2Index);
        // do crossover
        if (agent && agent2) {
          let doCrossover = rand(1) < this.crossOverChance;
          if (doCrossover) {
            this.crossover(agent, agent2);
          }
        }

        // clear out.
        agent2 = null;
        agent2Index = null;
      }
    });

    // Mutations
    // this.agents.forEach((agent) => this.mutate(agent));
    // this.agents.forEach((agent) => this.mutateByBits(agent));
  }

  mutateByBits(agent) {
    let gr = agent.geneticRepresentation.split("");
    gr.map((bit) => {
      // do mutation
      let factor = agent.fitnessScore !== 0 ? agent.fitnessScore : 0;
      let doMutation = rand(1) > this.mutationChance * factor;
      if (doMutation) {
        return bit === "0" ? "1" : "0";
      }

      return bit;
    });

    agent.geneticRepresentation = gr.join("");
  }

  mutate(agent) {
    let gr = agent.geneticRepresentation;
    let chunks = chunkString(gr, ALLELE_LENGTH);

    for (let i = 0; i < chunks.length; i++) {
      // do mutation
      let factor = agent.fitnessScore !== 0 ? agent.fitnessScore : 0;
      let doMutation = rand(1) > this.mutationChance * factor;
      if (doMutation) {
        let randIndex = randInt(chunks.length - 1);
        chunks = swapIndexes(chunks, i, randIndex);
      }
    }

    agent.geneticRepresentation = chunks.join("");
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
      let cut1 = gr1.slice(cuttingPoint);
      let cut2 = gr2.slice(cuttingPoint);

      gr1 = replaceStringFromIndex(gr1, cut2, cuttingPoint);
      gr2 = replaceStringFromIndex(gr2, cut1, cuttingPoint);
    }

    agent1.geneticRepresentation = gr1;
    agent2.geneticRepresentation = gr2;
  }

  #drawAgent(usedIndexes) {
    let tries = 0,
      index = 0,
      drawnAgent = null,
      agent = null;

    // Try to draw an agent.
    while (tries < DRAW_AGENTS_MAX_TRIES && drawnAgent === null) {
      for (index; index < this.agents.length; index++) {
        if (usedIndexes.includes(index)) continue;
        agent = this.agents[index];
        if (rand(1) <= agent.fitnessScore) {
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

  #sortAgents() {
    this.agents = this.agents.sort((a, b) => b.fitnessScore - a.fitnessScore);
  }

  /**
   *
   * @param {JimpImage}[image]
   * @param {int}[scale]
   * @param {int}[points]
   * @param {int|null}[color]
   * @param {boolean}[lerpColor]
   */
  spill({ image, scale = 1, color = null, lerpColor = true }) {
    let generateColor = color === null;
    this.agents.forEach((agent) => {
      if (generateColor) {
        color = getRandomColor();
      }
      image.drawBezier({
        bezierCurve: agent.bezierCurve,
        color,
        lerpColor,
        scale,
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
   * @param bezzierPoints
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
    bezzierPoints = 100,
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
          bezzierPoints,
        })
      );
    }

    return this.createAgentsFromCurves(curves);
  }
}

module.exports.default = Cauldron;
