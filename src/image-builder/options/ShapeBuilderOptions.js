import genetics from "../../genetics/index.js";
const { PopulationConfig } = genetics;
/**
 * @property {string} imageUrl - image url/path/base64
 * @property {int|null} color - the color of the bezzier curves in the population
 * @property {PopulationConfig} populationConfig - PopulationConfig object
 */
export default class ShapeBuilderOptions
{
  imageUrl;
  color;
  populationConfig;

  /**
   * @param {string} imageUrl
   * @param {int|null} color
   * @param {PopulationConfig} populationConfig
   */
  constructor({ imageUrl = '', color = null, populationConfig = null }) {
    this.imageUrl = imageUrl;
    this.color = color;
    this.populationConfig = populationConfig;
  }
}