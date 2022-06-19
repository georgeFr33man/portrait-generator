/* Fitness functions */
const IFitnessFunction = require("./IFitnessFunction");
const BaseFitnessFunction = require("./BaseFitnessFunction");
const MiddlePointsFitnessFunction =
  require("./MiddlePointsFitnessFunction");
const TestPointFitnessFunction = require("./TestPointFitnessFunction");

module.exports = {
  MiddlePointsFitnessFunction,
  TestPointFitnessFunction,
  IFitnessFunction,
  BaseFitnessFunction
};
