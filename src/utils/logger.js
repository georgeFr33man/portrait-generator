import {createString} from "../functions/stringFunctions";
import LoggerConfig from "./LoggerConfig";

const logLine = "<------------------------ LOG ------------------------>";
const errorLine = "<----------------------- ERROR ----------------------->";
const debugLine = "<----------------------- DEBUG ----------------------->";

/**
 * @param message
 */
export function log(message) {
  if (LoggerConfig.showLogs) {
    console.log(logLine);
    console.log(message);
    console.log();
  }
}

/**
 * @param message
 */
export function error(message) {
  if (LoggerConfig.showErrors) {
    console.error(errorLine);
    console.error(message);
    console.log();
  }
}

/**
 * @param message
 */
export function debug(message) {
  if (LoggerConfig.showDebug) {
    console.debug(debugLine);
    console.debug(message);
    console.log();
  }
}

/**
 * @param percentage
 */
export function loading(percentage) {
  if (LoggerConfig.showLoading) {
    console.clear();
    let loadingBar = "";
    loadingBar += createString("▓", Math.round(percentage));
    loadingBar += createString("░", 100 - Math.round(percentage));
    loadingBar += "  " + Math.round(percentage * 100) / 100 + "%";
    console.debug(loadingBar);
    console.log();
  }
}

export default { log, error, debug, loading };

