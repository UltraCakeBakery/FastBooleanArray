declare class FastBooleanArray {
    size: number;
    private buffer;
    constructor(size: number);
    set(input: number, value: boolean): void;
    get(input: number): boolean;
    get length(): number;
    set length(value: number);
}

export { FastBooleanArray as default };
