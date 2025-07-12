import FastBooleanArray from "../dist";
import { describe, test, expect } from "vitest";

describe("FastBooleanArray", () => {
  test("constructor should throw if size is not provided", () => {
    expect(() => new FastBooleanArray(0)).toThrow(
      "FastBooleanArray must have a size greater than 0"
    );
  });

  test("set and get should work correctly", () => {
    const array = new FastBooleanArray(16);
    array.set(0, true);
    array.set(1, false);
    array.set(2, true);

    expect(array.get(0)).toBe(true);
    expect(array.get(1)).toBe(false);
    expect(array.get(2)).toBe(true);
  });

  test("set and get should REALLY work correctly", () => {
    const array = new FastBooleanArray(200_000);

    // Set values: false for even, true for odd
    for (let i = 0; i < array.size; i++) {
      array.set(i, i % 2 === 1);
    }

    // Verify values
    for (let i = 0; i < array.size; i++) {
      const expected = i % 2 === 1;
      expect(array.get(i)).toBe(expected);
    }
  });

  test("setSafe and getSafe should throw on out-of-bounds access", () => {
    const array = new FastBooleanArray(16);
    expect(() => array.setSafe(16, true)).toThrow("Index out of bounds");
    expect(() => array.getSafe(16)).toThrow("Index out of bounds");
  });

  test("resize should change the size and preserve data", () => {
    const array = new FastBooleanArray(8);
    array.set(0, true);
    array.set(7, true);

    array.resize(16);
    expect(array.get(0)).toBe(true);
    expect(array.get(7)).toBe(true);
    expect(array.get(15)).toBe(false);

    array.resize(4);
    expect(array.get(0)).toBe(true);
    expect(array.get(5)).toBe(false);
    expect(() => array.getSafe(7)).toThrow();
  });

  test("equals should compare arrays correctly", () => {
    const array1 = new FastBooleanArray(8);
    const array2 = new FastBooleanArray(8);

    array1.set(0, true);
    array2.set(0, true);
    expect(array1.equals(array2)).toBe(true);

    array2.set(1, true);
    expect(array1.equals(array2)).toBe(false);
  });

  test("toArray should convert to a standard boolean array", () => {
    const array = new FastBooleanArray(4);
    array.set(0, true);
    array.set(1, false);
    array.set(2, true);
    array.set(3, false);

    expect(array.toArray()).toEqual([true, false, true, false]);
  });

  test("fromString and toString should convert correctly", () => {
    const original = "1010";
    const array = FastBooleanArray.fromString(original);
    expect(array.toString()).toBe(original);
  });

  test("fromArray should initialize correctly", () => {
    const values = [true, false, true, false];
    const array = FastBooleanArray.fromArray(values);
    expect(array.toArray()).toEqual(values);
  });

  test("setAll should set all bits to the specified value", () => {
    const array = new FastBooleanArray(16);
    array.setAll(true);
    expect(array.toArray()).toEqual(new Array(16).fill(true));

    array.setAll(false);
    expect(array.toArray()).toEqual(new Array(16).fill(false));
  });

  test("iterable protocol should work correctly", () => {
    const array = new FastBooleanArray(4);
    array.set(0, true);
    array.set(2, true);
    const result = [...array];
    expect(result).toEqual([true, false, true, false]);
  });

  test("accessLikeArray should allow array-like access", () => {
    const array = new FastBooleanArray(4).accessLikeArray();
    array[0] = true;
    array[1] = false;
    array[2] = true;
    array[3] = false;

    expect(array[0]).toBe(true);
    expect(array[1]).toBe(false);
    expect(array[2]).toBe(true);
    expect(array[3]).toBe(false);
  });

  test("map should create a new array with transformed values", () => {
    const array = new FastBooleanArray(4);
    array.set(0, true);
    array.set(2, true);

    const result = array.map((value) => !value);
    expect(result).toEqual([false, true, false, true]);
  });

  test("reduce should aggregate values", () => {
    const array = new FastBooleanArray(4);
    array.set(0, true);
    array.set(1, true);
    const sum = array.reduce((acc, value) => acc + (value ? 1 : 0), 0);
    expect(sum).toBe(2);
  });

  test("should work in a for loop", () => {
    const array = new FastBooleanArray(4);
    array.set(0, true);
    array.set(1, false);
    array.set(2, true);
    array.set(3, false);

    const result = [];
    for (const value of array) {
      result.push(value);
    }

    expect(result).toEqual([true, false, true, false]);
  });

  test("should work as an iterator directly", () => {
    const array = new FastBooleanArray(4);
    array.set(0, true);
    array.set(1, false);
    array.set(2, true);
    array.set(3, false);

    const iterator = array[Symbol.iterator]();
    expect(iterator.next().value).toBe(true);
    expect(iterator.next().value).toBe(false);
    expect(iterator.next().value).toBe(true);
    expect(iterator.next().value).toBe(false);
    expect(iterator.next().done).toBe(true);
  });
});
