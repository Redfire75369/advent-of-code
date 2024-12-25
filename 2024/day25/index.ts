import {sample, full} from "./inputs.ts";

const inputs = full;

/* Part 1 */
function part1() {
	const size: [number, number] = [inputs[0][0].length, inputs[0].length];
	function heights(isLock: boolean, input: string[][]) {
		const j0 = isLock ? 1 : size[1] - 1;
		const dj = isLock ? 1 : -1;

		const collection = isLock ? locks : keys;

		collection.push(input[0].map((_, i) => {
			let j;
			for (j = j0; input?.[j]?.[i] === "#"; j += dj) {}
			return Math.abs(j0 - j - (isLock ? 0 : 1));
		}));
	}

	const locks: number[][] = [];
	const keys: number[][] = [];

	for (const input of inputs) {
		heights(input[0][0] === "#", input);
	}

	let fits = 0;
	for (const lock of locks) {
		for (const key of keys) {
			const fit = lock.every((cut, i) => cut + key[i] + 1 < inputs[0].length);
			fits += fit ? 1 : 0;
		}
	}
	return fits;
}

console.log("Part 1:", part1());
