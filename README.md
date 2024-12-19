# Fast Boolean Array

In JavaScript, you sometimes need an array of booleans for a specific size. Using a regular JavaScript array works, but it can waste over 8x the memory. This is because JavaScript engines, like V8 (in Chrome and Node.js), represent all primitive types in a uniform way for optimization reasons. While a boolean is conceptually a 1-bit value, JavaScript engines typically allocate 1 byte (8 bits) per boolean value in memory. **Fast Boolean Array** solves this inefficiency by leveraging bit manipulation to store booleans in a compact format. It does bit manipulation on a uInt8Array, storing every boolean as a specific bit on each 8 bit int, fast and efficiently.

View detailed benchmark results below.

## Features

- **Memory Efficiency**: Stores booleans in bits rather than bytes, drastically reducing memory usage.
- **Simple API**: Intuitive methods for setting and getting values.
- **Performance**: Optimized for use in scenarios where memory constraints are critical.

---

## Installation

Install the package via npm:
```bash
npm install fast-boolean-array
```

---

## Usage

Here's how to use the Fast Boolean Array:

```javascript
const BooleanArray = require('fast-boolean-array');

// Create a new BooleanArray with the desired size
const booleans = new BooleanArray(10);

// Set a value at a specific index
booleans.set(0, true);

// Get the value at a specific index
console.log(booleans.get(0)); // Output: true

// Set another value
booleans.set(1, false);

// Retrieve it
console.log(booleans.get(1)); // Output: false
```

---

## API

### `new BooleanArray(size)`
Creates a new boolean array of the given size. All values are initialized to `false`.

- **Parameters:**
  - `size` (number): The number of booleans the array should hold.

### `set(index, value)`
Sets the boolean value at the specified index.

- **Parameters:**
  - `index` (number): The position in the array to set the value.
  - `value` (boolean): The value to set (`true` or `false`).

### `get(index)`
Gets the boolean value at the specified index.

- **Parameters:**
  - `index` (number): The position in the array to retrieve the value.

- **Returns:**
  - `boolean`: The value at the given index.

---

## Why Use Fast Boolean Array?

- **Efficient Memory Usage**: Ideal for applications handling large boolean arrays, such as data compression or state tracking.
- **Easy to Use**: Familiar `Map` and `Set` like API for minimal learning curve.
- **Scalable**: Suitable for high-performance, memory-sensitive projects.

---

# Fast Boolean Array vs Vanilla JavaScript Array Performance

Our benchmark compares the performance of our Fast Boolean Array library against Vanilla JavaScript arrays in terms of get and set operations across varying numbers of Booleans. The results below reflect an updated benchmark algorithm that performs 1,000 runs for each x amount of Booleans to better simulate real-world scenarios.

## Performance Breakdown

### 1 Boolean
| Test                     | Time (ms) | Memory (MB) |
|--------------------------|-----------|-------------|
| Set Vanilla Array        | 0.00      | 0.00        |
| Set Fast Boolean Array   | 0.00      | 0.00        |
| Get Vanilla Array        | 0.00      | N/A         |
| Get Fast Boolean Array   | 0.00      | N/A         |

**Observation:** At 1 boolean, both arrays remain equal in terms of performance and memory usage. Differences in performance are effectively immessurable, and one can assume practically identical.

### 100 Booleans
| Test                     | Time (ms) | Memory (MB) |
|--------------------------|-----------|-------------|
| Set Vanilla Array        | 0.00      | 0.00        |
| Set Fast Boolean Array   | 0.00      | 0.00        |
| Get Vanilla Array        | 0.00      | N/A         |
| Get Fast Boolean Array   | 0.00      | N/A         |

**Observation:** At 100 booleans, both arrays remain equal in terms of performance and memory usage. Differences in performance are effectively immessurable, and one can assume practically identical.

### 1,000 Booleans
| Test                     | Time (ms) | Memory (MB) |
|--------------------------|-----------|-------------|
| Set Vanilla Array        | 0.01      | 0.00        |
| Set Fast Boolean Array   | 0.00      | 0.00        |
| Get Vanilla Array        | 0.00      | N/A         |
| Get Fast Boolean Array   | 0.00      | N/A         |

**Observation:** At 1,000 booleans, the Fast Boolean Array is **10x** faster in set operations and uses **8x** less memory as expected. We have not yet been able to messure in actual bytes.

### 10,000 Booleans
| Test                     | Time (ms) | Memory (MB) |
|--------------------------|-----------|-------------|
| Set Vanilla Array        | 0.06      | 0.01        |
| Set Fast Boolean Array   | 0.02      | 0.00        |
| Get Vanilla Array        | 0.01      | N/A         |
| Get Fast Boolean Array   | 0.01      | N/A         |

**Observation:** For 10,000 booleans, Fast Boolean Array is **3x** faster in set operations and uses **8x** less memory as expected.

### 100,000 Booleans
| Test                     | Time (ms) | Memory (MB) |
|--------------------------|-----------|-------------|
| Set Vanilla Array        | 1.37      | 0.10        |
| Set Fast Boolean Array   | 0.21      | 0.01        |
| Get Vanilla Array        | 0.05      | N/A         |
| Get Fast Boolean Array   | 0.07      | N/A         |

**Observation:** At 100,000 booleans, Fast Boolean Array is approximately **6.5x** faster in set operations and uses **8x** less memory as expected.

### 1,000,000 Booleans
| Test                     | Time (ms) | Memory (MB) |
|--------------------------|-----------|-------------|
| Set Vanilla Array        | 19.62     | 0.95        |
| Set Fast Boolean Array   | 2.02      | 0.12        |
| Get Vanilla Array        | 0.48      | N/A         |
| Get Fast Boolean Array   | 0.71      | N/A         |

**Observation:** For 1,000,000 booleans, Fast Boolean Array is nearly **10x** faster in set operations and uses **8x** less memory as expected.

### 10,000,000 Booleans
| Test                     | Time (ms) | Memory (MB) |
|--------------------------|-----------|-------------|
| Set Vanilla Array        | 259.10    | 9.54        |
| Set Fast Boolean Array   | 21.57     | 1.19        |
| Get Vanilla Array        | 4.90      | N/A         |
| Get Fast Boolean Array   | 7.21      | N/A         |

**Observation:** At 10,000,000 booleans, Fast Boolean Array is about **12x** faster in set operations and uses nearly **8x** less memory as expected compared to Vanilla.

## Summary
This updated benchmark confirms that the Fast Boolean Array library excels in scenarios involving large datasets, offering substantial improvements in set operation performance and memory efficiency. The sweet spot remains around 100,000 indexes, where the library achieves its most pronounced gains (6.5x faster and much lower memory usage) over Vanilla JavaScript arrays.

---

## Contributing

Contributions are welcome! If you'd like to report a bug, suggest a feature, or submit a pull request, please visit the [GitHub repository](https://github.com/yourusername/fast-boolean-array).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

Thank you to the open-source community for inspiration and support!
