const { Cauldron, PopulationConfig, fitness } = require("../genetics");
const { logger } = require("../utils");
const { Picture } = require("../entities");
const { MiddlePointsFitnessFunction } = require("../genetics/fitness");
const ShapeBuilderOptions = require("./options/ShapeBuilderOptions");

/**
 * @property {string} shapeName - a shape name used in logs
 * @property {string} imageUrl - image url/path/base64
 * @property {boolean} negative - controls if the evaluation should be a negative
 * @property {PopulationConfig} populationConfig - a config object for the population
 * @property {number} crossOverChance - a chance factor for cross over
 * @property {number} mutationChance - a chance factor for mutationChance
 * @property {int} nofMixes - number of mixes in cauldron
 * @property {int} maxMixingTime - if specified the cauldron will doMixing for that number of milliseconds
 * @property {Picture} picture - the Picture object created with the imageUrl
 * @property {JimpImage} edgeMatrix - edge matrix JimpImage object
 * @property {JimpImage} binaryImage - binary image JimpImage object
 * @property {[{func: fitness.IFitnessFunction, weight: number}]} fitnessFuncs - number of mixes in cauldron
 * @property {ShapeBuilderOptions} options - shape builder options
 */
class BaseShapeBuilder {
  shapeName = "BaseBuilder";
  imageUrl;
  populationConfig;
  crossOverChance = 1.0;
  mutationChance = 1.0;
  negative = false
  nofMixes = 100;
  fitnessFuncs = [{ func: MiddlePointsFitnessFunction, weight: 1 }];
  maxMixingTime = 0;
  picture;
  edgeMatrix;
  binaryImage;
  options;

  /**
   * @param {ShapeBuilderOptions} shapeBuilderOptions
   */
  constructor(shapeBuilderOptions) {
    this.options = shapeBuilderOptions;
    this.imageUrl = shapeBuilderOptions.imageUrl;
    this.populationConfig = shapeBuilderOptions.populationConfig;
  }

  /**
   * It creates a new Picture object and assigns it to the picture property
   */
  getPicture() {
    this.picture = new Picture(this.imageUrl);
  }

  /**
   * It creates a cauldron, fills it with a population of random shapes, and then mixes them until the best shape is found
   * @returns {Promise<Cauldron>}
   */
  async buildShape() {
    logger.log("Building shape: " + this.shapeName);

    logger.log("Tworzenie matrycy krawędzi");
    this.edgeMatrix = await this.picture.edgeMatrix;
    this.binaryImage = await this.picture.binaryImage;

    this.populationConfig.xMax = this.binaryImage.width;
    this.populationConfig.yMax = this.binaryImage.height;

    logger.log("Usuwanie szumów");
    this.edgeMatrix.flattenImage(0.8);
    this.binaryImage.flattenImage(0.8);

    const cauldron = new Cauldron(this.populationConfig, this.negative, this.crossOverChance, this.mutationChance);

    logger.log("Miksowanie.");
    cauldron.doMixing({
      edgeMatrix: this.edgeMatrix,
      fitnessFuncs: this.fitnessFuncs,
      nofMixes: this.nofMixes,
      maxMixingTime: this.maxMixingTime,
    });

    return cauldron;
  }
}

module.exports = BaseShapeBuilder;