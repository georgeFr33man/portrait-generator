module.exports = { log, error, debug, loading };
const { createString } = require("./../functions/stringFunctions");

const logLine = "<------------------------ LOG ------------------------>";
const errorLine = "<----------------------- ERROR ----------------------->";
const debugLine = "<----------------------- DEBUG ----------------------->";

function log(message) {
  console.log(logLine);
  console.log(message);
  console.log();
}

function error(message) {
  console.error(errorLine);
  console.error(message);
  console.log();
}

function debug(message) {
  console.debug(debugLine);
  console.debug(message);
  console.log();
}

function loading(percentage) {
  console.clear();
  let loadingBar = "";
  loadingBar += createString("▓", Math.round(percentage));
  loadingBar += createString("░", 100 - Math.round(percentage));
  loadingBar += "  " + Math.round(percentage * 100) / 100 + "%";
  console.debug(loadingBar);
  console.log();
}
