const { PopulationConfig } = require("../genetics");

/**
 * @property {string} imageUrl - image url/path/base64
 * @property {PopulationConfig} populationConfig - PopulationConfig object
 */
class ShapeBuilderOptions
{
  imageUrl
  populationConfig

  /**
   * @param {string} imageUrl
   * @param {PopulationConfig} populationConfig
   */
  constructor({ imageUrl = '', populationConfig = null }) {
    this.imageUrl = imageUrl;
    this.populationConfig = populationConfig;
  }
}

module.exports = ShapeBuilderOptions;