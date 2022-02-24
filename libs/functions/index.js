const mathFunctions = require("./mathFunctions").default;
const misc = require("./misc").default;
const converters = require("./converters").default;

module.exports.default = { misc, converters, mathFunctions };

module.exports.misc = misc;
module.exports.mathFunctions = mathFunctions;
module.exports.converters = converters;
