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

  writeImage(fileName = "image.png") {
    this.image.write(fileName, () => {});
  }
}

module.exports.default = JimpImage;
