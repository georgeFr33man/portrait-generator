module.exports.default = {
  writeImage,
  getAsyncProperty,
};

function writeImage(image, fileName = "image.png") {
  image.write(fileName, () => {});
}

function getAsyncProperty(obj, propertyName, tries) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tries >= 1000 / 50) {
        reject("Rejected because of timeout.");
      } else if (obj.isWaiting && !obj[propertyName]) {
        resolve(getAsyncProperty(obj, propertyName, ++tries));
      } else {
        resolve(obj[propertyName]);
      }
    }, 50);
  });
}
