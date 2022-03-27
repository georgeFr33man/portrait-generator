/* Fitness functions */
const EndPointFitnessFunction = require("./EndPointFitnessFunction").default;
const AllPointsFitnessFunction = require("./AllPointsFitnessFunction").default;
const StartPointFitnessFunction =
  require("./StartPointFitnessFunction").default;
const MiddlePointsFitnessFunction =
  require("./MiddlePointsFitnessFunction").default;
const MiddlePointsMinFitnessFunction =
  require("./MiddlePointsMinFitnessFunction").default;

module.exports.default = {
  EndPointFitnessFunction,
  StartPointFitnessFunction,
  MiddlePointsFitnessFunction,
  MiddlePointsMinFitnessFunction,
  AllPointsFitnessFunction,
};
