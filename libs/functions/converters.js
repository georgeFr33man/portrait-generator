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
//endregion

//region BINARY
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
function binaryToDec(binary) {
  return parseInt(binary, 2);
}

//endregion
