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

module.exports.default = PopulationConfig;
