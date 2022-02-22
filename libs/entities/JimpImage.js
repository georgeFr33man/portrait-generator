class JimpImage {
  // @private
  #jimp;

  constructor(jimp) {
    this.#jimp = jimp;
  }

  get image() {
    return this.#jimp;
  }

  getColorOnPosition(x, y) {
    console.log("hit");

    return this.#jimp.getPixelColor(x, y, function (err, color) {
      console.log(color);
      return color;
    });
  }

  getColorWithThreshold(x, y, threshold) {}
}

module.exports.default = JimpImage;
