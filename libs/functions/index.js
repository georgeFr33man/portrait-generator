const mathFunctions = require("./mathFunctions");
const misc = require("./misc");
const converters = require("./converters");
const stringFunctions = require("./stringFunctions");

module.exports = { misc, converters, mathFunctions, stringFunctions };

module.exports.misc = misc;
module.exports.mathFunctions = mathFunctions;
module.exports.converters = converters;
module.exports.stringFunctions = stringFunctions;
