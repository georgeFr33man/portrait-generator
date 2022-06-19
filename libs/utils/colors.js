const Jimp = require("jimp");
const { rand } = require("./../functions/mathFunctions");
const { debug } = require("./../utils/logger");
const { hexToDec } = require("./../functions/converters");

const white = Jimp.rgbaToInt(255, 255, 255, 255);
const black = Jimp.rgbaToInt(0, 0, 0, 255);

const red = Jimp.rgbaToInt(255, 0, 0, 255);
const green = Jimp.rgbaToInt(0, 255, 0, 255);
const blue = Jimp.rgbaToInt(0, 0, 255, 255);

const transparent = Jimp.rgbaToInt(0, 0, 0, 0);

const colors = { white, black, red, green, blue, transparent };

module.exports = {
  getColor,
  getWithAlpha,
  getRandomColor,
  colors,
  ...colors,
};

/**
 * @param alpha
 * @returns {number}
 */
function getRandomColor(alpha = 255) {
  return Jimp.rgbaToInt(rand(255), rand(255), rand(255), alpha);
}

/**
 * @param color
 * @param alpha
 * @returns {number}
 */
function getWithAlpha(color, alpha = 255) {
  let rgba = Jimp.intToRGBA(color);

  return Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, alpha);
}

/**
 * @param hex
 * @returns {number}
 */
function getColor(hex) {
  if (hex.length === 6) {
    hex += "ff";
  }
  let decimal = hexToDec(hex),
    color = Jimp.intToRGBA(decimal);

  return Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
}
