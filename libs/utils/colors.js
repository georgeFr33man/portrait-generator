const Jimp = require("jimp");
const { rand } = require("./../functions/mathFunctions").default;
const { debug } = require("./../utils/logger").default;
const { hexToDec } = require("./../functions/converters").default;

const white = Jimp.rgbaToInt(255, 255, 255, 255);
const black = Jimp.rgbaToInt(0, 0, 0, 255);

const red = Jimp.rgbaToInt(255, 0, 0, 255);
const green = Jimp.rgbaToInt(0, 255, 0, 255);
const blue = Jimp.rgbaToInt(0, 0, 255, 255);

const transparent = Jimp.rgbaToInt(0, 0, 0, 0);

const colors = { white, black, red, green, blue, transparent };

module.exports.default = {
  getColor,
  getWithAlpha,
  getRandomColor,
  colors,
  ...colors,
};

function getRandomColor(alpha = 255) {
  return Jimp.rgbaToInt(rand(255), rand(255), rand(255), alpha);
}

function getWithAlpha(color, alpha = 255) {
  let rgba = Jimp.intToRGBA(color);

  return Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, alpha);
}

function getColor(hex) {
  if (hex.length === 6) {
    hex += "ff";
  }
  let decimal = hexToDec(hex),
    color = Jimp.intToRGBA(decimal);

  return Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
}
