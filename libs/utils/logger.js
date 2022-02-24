module.exports.default = { log, error, debug };

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
