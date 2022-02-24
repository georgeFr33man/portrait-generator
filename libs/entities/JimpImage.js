const Jimp = require("jimp");
const { clamp } = require("../functions").mathFunctions;
const { hexAlphaToDecNoAlpha, hexToDec } = require("../functions").converters;

class JimpImage {
  // @private
  #jimp;

  // @public
  width;
  height;

  constructor(jimp) {
    this.#jimp = jimp;
    this.width = jimp.getWidth();
    this.height = jimp.getHeight();
  }

  get image() {
    return this.#jimp;
  }

  getColorOnPosition(x, y) {
    return this.#jimp.getPixelColor(x, y, function (err, color) {
      return color;
    });
  }

  getColorWithThreshold(x, y, threshold) {
    let fromX = clamp(x - threshold, this.width),
      toX = clamp(x + threshold, this.width),
      fromY = clamp(y - threshold, this.height),
      toY = clamp(y + threshold, this.height),
      sum = 0,
      iterations = Math.abs(toX - fromX) * Math.abs(toY - fromY);

    for (let xx = fromX; xx <= toX; xx++) {
      for (let yy = fromY; yy <= toY; yy++) {
        sum += hexAlphaToDecNoAlpha(this.getColorOnPosition(xx, yy));
      }
    }

    return parseInt((sum / iterations).toString());
  }

  flattenImage(precision = 1) {
    let whiteVal = clamp(precision, 1) * hexToDec("FFFFFF");

    this.#scan((x, y) => {
      let colorVal = hexAlphaToDecNoAlpha(this.getColorOnPosition(x, y));
      if (colorVal < whiteVal) {
        this.image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), x, y);
      } else {
        this.image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), x, y);
      }
    });
  }

  writeImage(fileName = "image.png") {
    return this.image.write(fileName, (err, jimp) => {
      return jimp;
    });
  }

  #scan(fn) {
    this.image.scan(0, 0, this.width, this.height, fn);
  }
}

module.exports.default = JimpImage;
