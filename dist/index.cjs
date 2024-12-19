"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => FastBooleanArray
});
module.exports = __toCommonJS(src_exports);
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
//# sourceMappingURL=index.cjs.map