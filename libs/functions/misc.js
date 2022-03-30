const { error } = require("./../utils/logger");

module.exports.default = { getAsyncProperty, swapIndexes };

function getAsyncProperty(obj, propertyName, tries) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tries >= 1000 / 50) {
        error("Promise rejected, timeout!");
        reject("Rejected because of timeout.");
      } else if (!obj[propertyName]) {
        resolve(getAsyncProperty(obj, propertyName, ++tries));
      } else {
        resolve(obj[propertyName]);
      }
    }, 50);
  });
}

function swapIndexes(arr, i1, i2) {
  let tmp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = tmp;

  return arr;
}
