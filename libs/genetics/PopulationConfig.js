/**
 * Population configuration definition.
 *
 * @property {int} xMax - the base image width value
 * @property {int} yMax - the base image height value
 * @property {int} nofPointsMax - the maximum number of points for the bezzier curve
 * @property {int} nofPointsMin - the minimum number of points for the bezzier curve
 * @property {int} thicknessMax - the maximum thickness of the bezzier curve
 * @property {int} bezzierPoints - the number of bezzier curve points to evaluate
 * @property {int} size - the population size
 */
class PopulationConfig {
  /**
   * @param {int}[xMax]
   * @param {int}[yMax]
   * @param {int}[nofPointsMax]
   * @param {int}[nofPointsMin]
   * @param {int}[thicknessMax]
   * @param {int}[thicknessMin]
   * @param {int}[bezzierPoints]
   * @param {int}[size]
   */
  constructor({
    xMax,
    yMax,
    nofPointsMax = 2,
    nofPointsMin = 1,
    thicknessMax = 1,
    thicknessMin = 1,
    bezzierPoints = 100,
    size = 100,
  }) {
    this.xMax = xMax;
    this.yMax = yMax;
    this.nofPointsMax = nofPointsMax;
    this.nofPointsMin = nofPointsMin;
    this.thicknessMax = thicknessMax;
    this.thicknessMin = thicknessMin;
    this.bezzierPoints = bezzierPoints;
    this.size = size;
  }
}

module.exports = PopulationConfig;
