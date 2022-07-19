import genetics from "../genetics/index.js"
import JimpImage from "../entities/JimpImage.js";
import {black} from "../utils/colors.js";
import {log} from "../utils/logger.js";

const { Cauldron, PopulationConfig } = genetics;

/**
 * @property {[ImageBuilderOptions]} builders
 * @property {[Cauldron]} cauldrons
 */
export default class ImageBuilder {
  /**
   * @param {ImageBuilderOptions} builders
   */
  constructor(...builders) {
    this.builders = builders;
  }

  async createCauldrons() {
    this.cauldrons = [];
    for (let i = 0; i < this.builders.length; i++) {
      log("Building a shape: " + (i + 1));
      this.cauldrons.push(await this.builders[i].shapeBuilder.buildShape())
    }
  }

  /**
   * @param {int} scale
   * @returns {Promise<JimpImage>}
   */
  async getImage(scale = 1) {
    await this.createCauldrons();
    const dimensions = { x: 0, y: 0 };
    this.cauldrons.forEach(cauldron => {
      /** @type {PopulationConfig} */
      const conf = cauldron.populationConfig;

      if (conf.xMax > dimensions.x && conf.yMax > dimensions.y) {
        dimensions.x = conf.xMax;
        dimensions.y = conf.yMax;
      }
    });

    const image = JimpImage.createFromParams(dimensions.x, dimensions.y, scale);
    image.fillColor(black);

    this.cauldrons.forEach((cauldron, index) => {
      /** @type {ShapeBuilderOptions} */
      const builderOptions = this.builders[index].shapeBuilder.options;

      log("Drawing from cauldron: " + (index + 1));

      cauldron.spill({
        image,
        color: builderOptions.color,
        lerpColor: true,
        scale,
      });
    });

    return image;
  }

  async saveImage(path, scale = 1) {
    /** @type {JimpImage} */
    const image = await this.getImage(scale);

    log("Saving the image");
    await image.writeImage(path);
  }

  async getBase64(scale = 1) {
    /** @type {JimpImage} */
    const image = await this.getImage(scale);
    return image.toBase64();
  }
}
