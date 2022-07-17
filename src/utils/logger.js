import {createString} from "./../functions/stringFunctions.js";

const logLine = "<------------------------ LOG ------------------------>";
const errorLine = "<----------------------- ERROR ----------------------->";
const debugLine = "<----------------------- DEBUG ----------------------->";

export function log(message) {
  console.log(logLine);
  console.log(message);
  console.log();
}

/**
 * @param message
 */
export function error(message) {
  console.error(errorLine);
  console.error(message);
  console.log();
}

/**
 * @param message
 */
export function debug(message) {
  console.debug(debugLine);
  console.debug(message);
  console.log();
}

/**
 * @param percentage
 */
export function loading(percentage) {
  console.clear();
  let loadingBar = "";
  loadingBar += createString("▓", Math.round(percentage));
  loadingBar += createString("░", 100 - Math.round(percentage));
  loadingBar += "  " + Math.round(percentage * 100) / 100 + "%";
  console.debug(loadingBar);
  console.log();
}

export default { log, error, debug, loading };

