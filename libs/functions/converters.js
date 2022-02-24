module.exports.default = {
  decToHex,
  decToHexAlpha,
  hexAlphaToHex,
  hexAlphaToDecNoAlpha,
  hexToDec,
};

function decToHex(dec) {
  return parseInt(dec).toString(16);
}

function decToHexAlpha(dec) {
  return parseInt(dec).toString(16) + "ff";
}

function hexAlphaToHex(hexAlpha) {
  return hexAlpha.substring(0, hexAlpha.length - 2);
}

function hexAlphaToDecNoAlpha(hexAlpha) {
  return hexToDec(hexAlphaToHex(decToHex(hexAlpha)));
}

function hexToDec(hex) {
  return hex.length ? parseInt(hex, 16) : 0;
}
