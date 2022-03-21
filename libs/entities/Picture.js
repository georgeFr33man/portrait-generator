const Jimp = require("jimp");
const JimpImage = require("./JimpImage").default;
const { getAsyncProperty } = require("../functions").misc;

const KERNELS = [
  {
    name: "emboss",
    kernel: [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2],
    ],
  },
  {
    name: "edgedetect",
    kernel: [
      [0, 1, 0],
      [1, -4, 1],
      [0, 1, 0],
    ],
  },
  {
    name: "edgeenhance",
    kernel: [
      [0, 0, 0],
      [-1, 1, 0],
      [0, 0, 0],
    ],
  },
  {
    name: "blur",
    kernel: [
      [0.0625, 0.125, 0.0625],
      [0.125, 0.25, 0.125],
      [0.0625, 0.125, 0.0625],
    ],
  },
  {
    name: "sharpen",
    kernel: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
  },
];

class Picture {
  // @public
  _oi;
  _em;
  imageUrl;
  isWaiting = false;

  /**
   * @param {string} [imageUrl]
   */
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.init();
  }

  init() {
    this.#createEdgeMatrix();
  }

  /**
   * @returns {Promise}
   */
  get edgeMatrix() {
    return getAsyncProperty(this, "_em").catch(() => null);
  }

  /**
   * @returns {Promise}
   */
  get originalImage() {
    return getAsyncProperty(this, "_oi").catch(() => null);
  }

  #createEdgeMatrix() {
    this.isWaiting = true;
    const jimp = Jimp.read(this.imageUrl);

    jimp.then((image) => {
      this._oi = new JimpImage(image);

      // image.greyscale();
      // image.contrast(1);
      // for (let kernel of KERNELS) {
      //   image.convolute(kernel.kernel);
      // }
      this._em = new JimpImage(image);
      this.isWaiting = false;
    });
  }
}

module.exports.default = Picture;
