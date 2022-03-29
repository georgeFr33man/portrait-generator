/* Fitness functions */
const EndPointFitnessFunction = require("./EndPointFitnessFunction").default;
const StartPointFitnessFunction =
  require("./StartPointFitnessFunction").default;
const MiddlePointsFitnessFunction =
  require("./MiddlePointsFitnessFunction").default;
const TestPointFitnessFunction = require("./TestPointFitnessFunction").default;

module.exports.default = {
  EndPointFitnessFunction,
  StartPointFitnessFunction,
  MiddlePointsFitnessFunction,
  TestPointFitnessFunction,
};
