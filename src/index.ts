export default class FastBooleanArray {
	public size: number;
	private buffer: Uint8Array;

	constructor(size: number) {
		this.size = size;
		this.buffer = new Uint8Array(Math.ceil(size / 8)); // Allocate memory
	}

	/**
	 * Sets a boolean value at the specified index.
	 * @param {number} index - The index to set the boolean value at.
	 * @param {number} value - The boolean value to set the `index`.
	 * @returns {boolean} The boolean value that was set.
	 */
	set(index: number, value: any) {
		if (value) {
			this.buffer[index >> 3] |= 1 << (index & 7); // Set bit
			return true;
		} else {
			this.buffer[index >> 3] &= ~(1 << (index & 7)); // Clear bit
			return false;
		}
	}

	/**
	 * like `set` but throws if the index is out of bounds (less than 0 or greater than or equal to the array size).
	 * @param {number} index - The index to set the boolean value at.
	 * @param {number} value - The boolean value to set the `index`.
	 * @returns {boolean} The boolean value that was set.
	 * @throws {RangeError} If the index is out of bounds (less than 0 or greater than or equal to the array size).
	 */
	setSafe(index: number, value: any) {
		if (index < 0 || index >= this.size) {
			throw new RangeError('Index out of bounds');
		}
		return this.set(index, value);
	}

	/**
	 * Gets a boolean value at the specified index.
	 * @param {number} index - The index to get the boolean value of.
	 * @returns {boolean} The boolean value that was set.
	 * @throws {RangeError} If the index is out of bounds (less than 0 or greater than or equal to the array size).
	 */
	get(index: number) {
		return (this.buffer[index >> 3] & (1 << index % 8)) !== 0; // Check bit
	}

	/**
	 * like `get` but throws if the index is out of bounds (less than 0 or greater than or equal to the array size).
	 * @param {number} index - The index to get the boolean value of.
	 * @returns {boolean} The boolean value that was set.
	 * @throws {RangeError} If the index is out of bounds (less than 0 or greater than or equal to the array size).
	 */
	getSafe(index: number) {
		if (index < 0 || index >= this.size) {
			throw new RangeError('Index out of bounds');
		}
		return this.get(index);
	}

	get length() {
		return this.size;
	}

	set length(_value: number) {
		throw new Error("Setting the length on BooleanArray's is not supported");
	}
}
