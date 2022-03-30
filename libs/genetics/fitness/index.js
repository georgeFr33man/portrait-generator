/* Fitness functions */
const MiddlePointsFitnessFunction =
  require("./MiddlePointsFitnessFunction").default;
const TestPointFitnessFunction = require("./TestPointFitnessFunction").default;

module.exports.default = {
  MiddlePointsFitnessFunction,
  TestPointFitnessFunction,
};
