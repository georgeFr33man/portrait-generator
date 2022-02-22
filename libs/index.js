/* Entities */
const curve = require('./entities/Curve').default;
const image = require('./entities/Image').default;
module.exports.entities = { curve, image };

/* Functions */
const functions = require('./functions/index').default;
module.exports.functions = { functions };
