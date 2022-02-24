module.exports.default = { clamp, rand, getPointsWithThreshold };

function clamp(value, max) {
  if (value < 0) {
    return 0;
  }
  if (value > max) {
    return max;
  }

  return value;
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

function getPointsWithThreshold(point, threshold, xMax, yMax) {
  return {
    xMin: clamp(point.x - threshold, xMax),
    xMax: clamp(point.x + threshold, xMax),
    yMin: clamp(point.y - threshold, yMax),
    yMax: clamp(point.y + threshold, yMax),
  };
}
