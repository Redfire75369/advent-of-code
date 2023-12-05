import {samples, full} from "./inputs.ts";

const inputs = full;

function uniqueWindowIndex(length: number): number {
	for (let i = 0; i < inputs.length; i++) {
		const window = inputs.slice(i, i + length);
		if (window.every(w => window.filter(w2 => w === w2).length === 1)) {
			return i;
		}
	}
	return -1;
}

/* Part 1 */
function part1() {
	return uniqueWindowIndex(4) + 4;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return uniqueWindowIndex(14) + 14;
}

console.log("Part 2:", part2());
