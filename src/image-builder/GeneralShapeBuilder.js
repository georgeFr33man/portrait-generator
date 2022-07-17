import BaseBuilder from "./BaseShapeBuilder.js";
import ShapeBuilderOptions from "./options/ShapeBuilderOptions.js";
import genetics from "../genetics/index.js";

const { PopulationConfig } = genetics;

export default class GeneralShapeBuilder extends BaseBuilder {
  /**
   * @param {ShapeBuilderOptions} shapeBuilderOptions
   */
  constructor(shapeBuilderOptions) {
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

    super(new ShapeBuilderOptions({
      imageUrl: shapeBuilderOptions.imageUrl,
      color: shapeBuilderOptions.color,
      populationConfig
    }));

    this.mutationChance = 0.3;
    this.crossOverChance = 0.8;
    this.maxMixingTime = 60 * 1000;
    this.negative = true;
    this.shapeName = 'general shape';
    this.getPicture();
  }
}