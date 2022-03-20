module.exports.default = {
  clamp,
  rand,
  getPointsWithThreshold,
  lerp,
  normalize,
};

function clamp(value, max) {
  if (value < 0) {
    return 0;
  }
  if (value > max) {
    return max;
  }

  return value;
}

function rand(max, min = 0) {
  return Math.random() * (max - min) + min;
}

function lerp(start, end, t) {
  return start + (end - start) * clamp(t, 1);
}

/**
 *
 * @param {number}[value]
 * @param {number}[max]
 * @param {number}[min]
 * @return {number}
 */
function normalize(value, max, min) {
  if (max === min) {
    return 1;
  }
  return (value - min) / (max - min);
}

function getPointsWithThreshold(point, threshold, xMax, yMax) {
  return {
    xMin: clamp(point.x - threshold, xMax),
    xMax: clamp(point.x + threshold, xMax),
    yMin: clamp(point.y - threshold, yMax),
    yMax: clamp(point.y + threshold, yMax),
  };
}
