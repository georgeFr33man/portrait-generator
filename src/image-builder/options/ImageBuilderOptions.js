/**
 * @property {BaseShapeBuilder} shapeBuilder - a shape builder
 */
export default class ImageBuilderOptions {
  /**
   * @param {BaseShapeBuilder.prototype.constructor} shapeBuilderClass
   * @param {ShapeBuilderOptions} shapeBuilderOptions
   */
  constructor({ shapeBuilderClass, shapeBuilderOptions }) {
    this.shapeBuilder = new shapeBuilderClass(shapeBuilderOptions);
  }
}
