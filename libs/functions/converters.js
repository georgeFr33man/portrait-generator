module.exports = {
  decToHex,
  decToHexAlpha,
  hexAlphaToHex,
  hexAlphaToDecNoAlpha,
  hexToDec,
  binaryToDec,
  decToBinary,
};

module.exports.hex = {
  decToHex,
  decToHexAlpha,
  hexAlphaToHex,
  hexAlphaToDecNoAlpha,
  hexToDec,
};

module.exports.binary = {
  binaryToDec,
  decToBinary,
};

//region HEX
/**
 * @param dec
 * @returns {string}
 */
function decToHex(dec) {
  return parseInt(dec).toString(16);
}

/**
 * @param dec
 * @returns {string}
 */
function decToHexAlpha(dec) {
  return parseInt(dec).toString(16) + "ff";
}

/**
 * @param hexAlpha
 * @returns {string}
 */
function hexAlphaToHex(hexAlpha) {
  return hexAlpha.substring(0, hexAlpha.length - 2);
}

/**
 * @param hexAlpha
 * @returns {number | number}
 */
function hexAlphaToDecNoAlpha(hexAlpha) {
  return hexToDec(hexAlphaToHex(decToHex(hexAlpha)));
}

/**
 * @param hex
 * @returns {number|number}
 */
function hexToDec(hex) {
  return hex.length ? parseInt(hex, 16) : 0;
}
//endregion

//region BINARY
/**
 * @param dec
 * @param length
 * @returns {string}
 */
function decToBinary(dec, length) {
  let binary = parseInt(dec).toString(2);
  if (binary.length < length) {
    let diff = length - binary.length,
      prepend = "";
    for (let i = 0; i < diff; i++) {
      prepend += "0";
    }
    binary = prepend + binary;
  }

  return binary;
}

/**
 * @param binary
 * @returns {number}
 */
function binaryToDec(binary) {
  return parseInt(binary, 2);
}

//endregion
