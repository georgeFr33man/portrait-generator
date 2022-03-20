const mathFunctions = require("./mathFunctions").default;
const misc = require("./misc").default;
const converters = require("./converters").default;
const stringFunctions = require("./stringFunctions").default;

module.exports.default = { misc, converters, mathFunctions, stringFunctions };

module.exports.misc = misc;
module.exports.mathFunctions = mathFunctions;
module.exports.converters = converters;
module.exports.stringFunctions = stringFunctions;
