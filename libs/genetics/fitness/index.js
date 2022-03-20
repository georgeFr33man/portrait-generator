/* Fitness functions */
const EndPointsFitnessFunction = require("./EndPointsFitnessFunction").default;
const MiddlePointsFitnessFunction =
  require("./MiddlePointsFitnessFunction").default;

module.exports.default = {
  EndPointsFitnessFunction,
  MiddlePointsFitnessFunction,
};
