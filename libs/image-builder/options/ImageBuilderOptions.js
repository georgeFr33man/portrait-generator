const ShapeBuilderOptions = require("./ShapeBuilderOptions");

/**
 * @property {BaseShapeBuilder} shapeBuilder - a shape builder
 */
class ImageBuilderOptions {
  /**
   * @param {BaseShapeBuilder.prototype.constructor} shapeBuilderClass
   * @param {ShapeBuilderOptions} shapeBuilderOptions
   */
  constructor({ shapeBuilderClass, shapeBuilderOptions }) {
    this.shapeBuilder = new shapeBuilderClass(shapeBuilderOptions);
  }
}

module.exports = ImageBuilderOptions