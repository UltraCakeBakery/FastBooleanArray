import BooleanArray from './dist/index.js';
import { performance } from 'node:perf_hooks';
import { serialize } from 'v8';

function getMemoryUsageOfReference(ref) {
	const serialized = serialize(ref); // Convert the reference to a Buffer
	return serialized.length; // The size of the serialized Buffer in bytes
}

function testVanillaArraySet(amount, analyzeMemory = true) {
	const vanillaArray = [];
	const startTime = performance.now();
	for (let i = 0; i < amount; i++) {
		vanillaArray[i] = true;
	}
	const endTime = performance.now();
	const usedMemory = analyzeMemory ? getMemoryUsageOfReference(vanillaArray) : 0;
	return { vanillaArray, usedMemory, startTime, endTime };
}
testVanillaArraySet._name = 'Set Vanilla array     ';

function testBooleanArraySet(amount, analyzeMemory = true) {
	const theBooleanArray = new BooleanArray(amount);
	const startTime = performance.now();
	for (let i = 0; i < amount; i++) {
		theBooleanArray.set(i, true);
	}
	const endTime = performance.now();
	const usedMemory = analyzeMemory ? getMemoryUsageOfReference(theBooleanArray) : 0;
	return { theBooleanArray, usedMemory, startTime, endTime };
}
testBooleanArraySet._name = 'Set Fast Boolean Array';

function testVanillaArrayGet(amount) {
	const { vanillaArray } = testVanillaArraySet(amount, false);
	const startTime = performance.now();
	for (let i = 0; i < amount; i++) {
		vanillaArray[i];
	}
	const endTime = performance.now();
	return {
		usedMemory: 0,
		startTime,
		endTime
	};
}
testVanillaArrayGet._name = 'Get Vanilla array     ';

function testBooleanArrayGet(amount) {
	const { theBooleanArray } = testBooleanArraySet(amount, false);
	const startTime = performance.now();
	for (let i = 0; i < amount; i++) {
		theBooleanArray.get(i, true);
	}
	const endTime = performance.now();
	return {
		usedMemory: 0,
		startTime,
		endTime
	};
}
testBooleanArrayGet._name = 'Get Fast Boolean Array';

function performanceTest(test, amount) {
	const runs = 1000; // Number of times to run the test
	let totalTime = 0;
	let totalMemory = 0;

	for (let i = 0; i < runs; i++) {
		const { startTime, endTime, usedMemory } = test(amount);

		totalTime += endTime - startTime;
		totalMemory += usedMemory;
	}

	const averageTime = (totalTime / runs).toFixed(8);
	const averageMemory = totalMemory / runs;

	console.log(
		`${test._name}: ${averageTime} ms | ${test.name.includes('Set') ? averageMemory + ' Bytes' : 'N/A'} | ${amount} indexes`
	);
}

// Run tests
console.clear();
[1, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000].forEach(async (amount) => {
	console.log('');
	[testVanillaArraySet, testBooleanArraySet, testVanillaArrayGet, testBooleanArrayGet].forEach(
		(test) => {
			performanceTest(test, amount);
		}
	);
	await new Promise((resolve) => {
		setTimeout(resolve, 5_000); // Let garbadge collection do its thing for more accurate memory logging
	});
});
