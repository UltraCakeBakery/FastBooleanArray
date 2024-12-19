// src/index.ts
var FastBooleanArray = class {
  size;
  buffer;
  constructor(size) {
    this.size = size;
    this.buffer = new Uint8Array(Math.ceil(size / 8));
  }
  set(input, value) {
    if (value) {
      this.buffer[input >> 3] |= 1 << (input & 7);
    } else {
      this.buffer[input >> 3] &= ~(1 << (input & 7));
    }
  }
  get(input) {
    return (this.buffer[input >> 3] & 1 << input % 8) !== 0;
  }
  get length() {
    return this.size;
  }
  set length(value) {
    throw new Error("Setting the length on BooleanArray's is not supported");
  }
};
export {
  FastBooleanArray as default
};
//# sourceMappingURL=index.js.map