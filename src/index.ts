export default class FastBooleanArray {
	public size: number;
	private buffer: Uint8Array;

	constructor(size: number) {
		this.size = size;
		this.buffer = new Uint8Array(Math.ceil(size / 8)); // Allocate memory
	}

	set(input: number, value: boolean) {
		if (value) {
			this.buffer[input >> 3] |= 1 << (input & 7); // Set bit
		} else {
			this.buffer[input >> 3] &= ~(1 << (input & 7)); // Clear bit
		}
	}

	get(input: number) {
		return (this.buffer[input >> 3] & (1 << input % 8)) !== 0; // Check bit
	}

	get length() {
		return this.size;
	}

	set length(value: number) {
		throw new Error("Setting the length on BooleanArray's is not supported");
	}
}
