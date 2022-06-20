const ImageBuilderOptions = require("./options/ImageBuilderOptions");
const { Cauldron, PopulationConfig } = require("../genetics");
const { JimpImage } = require("../entities");
const { black } = require("../utils").colors;
const { log } = require("../utils").logger;

/**
 * @property {[ImageBuilderOptions]} builders
 * @property {[Cauldron]} cauldrons
 */
class ImageBuilder
{
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
    const dimensions = {x: 0, y: 0};
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
}

module.exports = ImageBuilder;