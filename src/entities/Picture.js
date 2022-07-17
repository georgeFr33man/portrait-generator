import Jimp from "jimp";
import JimpImage from "./JimpImage.js";
import functions from "../functions/index.js";

const { misc } = functions;
const { getAsyncProperty } = misc;

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

/**
 * @propety {JimpImage} _oi - original image
 * @propety {JimpImage} _em - edge matrix image
 * @propety {JimpImage} _bi - binary image
 * @propety {string} imageUrl - image url/base64/path
 */
export default class Picture {
  _oi;
  _em;
  _bi;
  imageUrl;

  /**
   * @param {string} [imageUrl]
   */
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.init();
  }

  init() {
    this.#createEdgeMatrix();
    this.#createBinary();
  }

  /**
   * @returns {Promise<JimpImage>}
   */
  get binaryImage() {
    return getAsyncProperty(this, "_bi").catch(() => null);
  }

  /**
   * @returns {Promise<JimpImage>}
   */
  get edgeMatrix() {
    return getAsyncProperty(this, "_em").catch(() => null);
  }

  /**
   * @returns {Promise<JimpImage>}
   */
  get originalImage() {
    return getAsyncProperty(this, "_oi").catch(() => null);
  }

  #createEdgeMatrix() {
    const jimp = Jimp.read(this.imageUrl);

    jimp.then((image) => {
      this._oi = new JimpImage(image);

      image.greyscale();
      image.contrast(1);
      for (let kernel of KERNELS) {
        image.convolute(kernel.kernel);
      }
      this._em = new JimpImage(image);
    });
  }

  #createBinary() {
    const jimp = Jimp.read(this.imageUrl);

    jimp.then((image) => {
      image.greyscale();
      image.contrast(1);
      this._bi = new JimpImage(image);
    });
  }
}
