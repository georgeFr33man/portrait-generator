const { error } = require("./../utils/logger");

module.exports.default = { getAsyncProperty };

function getAsyncProperty(obj, propertyName, tries) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tries >= 1000 / 50) {
        error("Promise rejected, timeout!");
        reject("Rejected because of timeout.");
      } else if (obj.isWaiting && !obj[propertyName]) {
        resolve(getAsyncProperty(obj, propertyName, ++tries));
      } else {
        resolve(obj[propertyName]);
      }
    }, 50);
  });
}
