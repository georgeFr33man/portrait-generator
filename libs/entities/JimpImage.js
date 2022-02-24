const Jimp = require("jimp");
const { clamp, getPointsWithThreshold, lerp } =
  require("../functions").mathFunctions;
const { white, black, transparent, getWithAlpha } = require("../utils").colors;
const { hexAlphaToDecNoAlpha, hexToDec } = require("../functions").converters;

class JimpImage {
  // @private
  #jimp;

  // @public
  width;
  height;
  scale;

  constructor(jimp, scale = 1) {
    this.#jimp = jimp;
    this.width = jimp.getWidth();
    this.height = jimp.getHeight();
    this.scale = scale;
  }

  get image() {
    return this.#jimp;
  }

  getColorOnPosition(x, y, threshold = null) {
    if (threshold !== null) {
      return this.#getColorWithThreshold(x, y, threshold);
    }
    return this.#jimp.getPixelColor(x, y, function (err, color) {
      return color;
    });
  }

  #getColorWithThreshold(x, y, threshold) {
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

  drawPoint({ x, y, color = black, thickness = 1, lerpColor = false }) {
    if (thickness > 1) {
      let { xMin, xMax, yMin, yMax } = getPointsWithThreshold(
          { x, y },
          thickness / 2,
          this.width,
          this.height
        ),
        diffX = Math.abs(xMax - xMin),
        diffY = Math.abs(yMax - yMin);
      this.image.scan(xMin, yMin, diffX, diffY, (xx, yy) => {
        if (lerpColor) {
          let t =
            1 - (Math.abs(x - xx) / diffX) * (1 - Math.abs(y - yy) / diffY);
          let alpha = lerp(0, 255, t);
          color = getWithAlpha(color, alpha);
        }
        this.image.setPixelColor(color, xx, yy);
      });
    } else {
      this.image.setPixelColor(color, x, y);
    }
  }

  fillColor(color) {
    this.#scan((x, y) => {
      this.drawPoint({ x, y, color });
    });
  }

  drawBezier({
    bezierCurve,
    points = 10,
    color = white,
    thickness = 1,
    lerpColor = false,
  }) {
    let step = 1 / points;
    for (let t = 0; t < 1; t += step) {
      let [x, y] = bezierCurve.getPoint(t);
      this.drawPoint({ x, y, color, thickness, lerpColor });
    }
  }

  writeImage(fileName = "image.png") {
    return this.image.write(fileName, (err, jimp) => {
      return jimp;
    });
  }

  static createFromMatrix(edgeMatrix, scale = 1) {
    return new JimpImage(
      new Jimp(
        edgeMatrix.width * scale,
        edgeMatrix.height * scale,
        transparent,
        (err, image) => image
      ),
      scale
    );
  }

  #scan(fn) {
    this.image.scan(0, 0, this.width, this.height, fn);
  }
}

module.exports.default = JimpImage;
