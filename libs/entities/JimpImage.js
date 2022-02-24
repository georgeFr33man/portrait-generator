const { clamp, getPointsWithThreshold } = require("../functions").mathFunctions;
const { white, black } = require("../utils").colors;
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
    let { xMin, xMax, yMin, yMax } = getPointsWithThreshold(
      x,
      y,
      threshold,
      this.width,
      this.height
    );
    let sum = 0,
      iterations = Math.abs(xMin - xMax) * Math.abs(yMin - yMax);

    this.image.scan(xMin, yMin, xMax, yMax, (xx, yy) => {
      sum += hexAlphaToDecNoAlpha(this.getColorOnPosition(xx, yy));
    });

    return parseInt((sum / iterations).toString());
  }

  flattenImage(precision = 1) {
    let whiteVal = clamp(precision, 1) * hexToDec("FFFFFF");

    this.#scan((x, y) => {
      let colorVal = hexAlphaToDecNoAlpha(this.getColorOnPosition(x, y));
      if (colorVal < whiteVal) {
        this.drawPoint({ x, y });
      } else {
        this.drawPoint({ x, y, color: white });
      }
    });
  }

  drawPoint({ x, y, color = black, thickness = 1 }) {
    if (thickness > 1) {
      let { xMin, xMax, yMin, yMax } = getPointsWithThreshold(
        { x, y },
        thickness / 2,
        this.width,
        this.height
      );
      this.image.scan(
        xMin,
        yMin,
        Math.abs(xMax - xMin),
        Math.abs(yMax - yMin),
        (xx, yy) => {
          this.image.setPixelColor(color, xx, yy);
        }
      );
    } else {
      this.image.setPixelColor(color, x, y);
    }
  }

  drawBezier({ bezierCurve, points = 10, color = white, thickness = 1 }) {
    let step = 1 / points;
    for (let t = 0; t < 1; t += step) {
      let [x, y] = bezierCurve.getPoint(t);
      this.drawPoint({ x, y, color, thickness });
    }
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
