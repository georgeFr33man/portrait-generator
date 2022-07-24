import Jimp from "jimp";
import {rand} from "../functions/mathFunctions";
import {hexToDec} from "../functions/converters";

export const white = Jimp.rgbaToInt(255, 255, 255, 255);
export const black = Jimp.rgbaToInt(0, 0, 0, 255);

export const red = Jimp.rgbaToInt(255, 0, 0, 255);
export const green = Jimp.rgbaToInt(0, 255, 0, 255);
export const blue = Jimp.rgbaToInt(0, 0, 255, 255);

export const transparent = Jimp.rgbaToInt(0, 0, 0, 0);

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
  hex = hex.replace(/#/gi, '');
  if (hex.length === 6) {
    hex += "ff";
  }
  let decimal = hexToDec(hex), color = Jimp.intToRGBA(decimal);

  return Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
}

export {getColor, getWithAlpha, getRandomColor};
export const colors = { white, black, red, green, blue, transparent };
