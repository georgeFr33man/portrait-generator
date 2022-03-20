const { error } = require("./../utils/logger");

module.exports.default = { createString, replaceStringFromIndex };

/**
 * @param {string}[char]
 * @param {int}[len]
 * @return {string}
 */
function createString(char, len) {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += char;
  }

  return str;
}

/**
 * @param {string}[str]
 * @param {string}[replaceWith]
 * @param {int}[startingAt]
 * @return {string}
 */
function replaceStringFromIndex(str, replaceWith, startingAt) {
  let index = 0,
    newStr = str.slice(0, startingAt);

  for (let i = 0; i < replaceWith.length; i++, index++) {
    newStr += replaceWith.charAt(index);
  }
  newStr += str.slice(startingAt + replaceWith.length, str.length);

  return newStr;
}
