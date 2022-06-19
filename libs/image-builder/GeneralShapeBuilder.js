const BaseBuilder = require("./BaseShapeBuilder");
const { PopulationConfig } = require("../genetics");

class GeneralShapeBuilder extends BaseBuilder {
  constructor({ imageUrl = '' }) {
    const populationConfig = new PopulationConfig({
      xMax: 0,
      yMax: 0,
      nofPointsMax: 4,
      nofPointsMin: 2,
      thicknessMax: 2,
      thicknessMin: 1,
      bezzierPoints: 100,
      size: 1000,
    });

    super({ imageUrl, populationConfig });

    this.mutationChance = 0.3;
    this.crossOverChance = 0.8;
    this.maxMixingTime = 60 * 1000;
    this.negative = true;
    this.shapeName = 'general shape';
    this.getPicture();
  }
}

module.exports = GeneralShapeBuilder;