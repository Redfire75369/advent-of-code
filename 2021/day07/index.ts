import {sample, full} from "./inputs.ts";

const inputs = full;

/* Part 1 */
function part1() {
	const maximum = Math.max(...inputs);
	let lowest = inputs.reduce((acc, pos) => acc + pos, 0);
	let index = -1;
	for (let i = 1; i < maximum + 1; i++) {
		const fuel = inputs.reduce((acc, x) => acc + Math.abs(x - i), 0);
		if (fuel < lowest) {
			lowest = fuel;
			index = i;
		}
	}
	return lowest;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const maximum = Math.max(...inputs);
	let lowest = inputs.reduce((acc, pos) => acc + pos * (pos + 1) / 2, 0);
	for (let i = 1; i < maximum + 1; i++) {
		const fuel = inputs.reduce((acc, pos) => acc + Math.abs(pos - i) * (Math.abs(pos - i) + 1) / 2, 0);
		if (fuel < lowest) {
			lowest = fuel;
		}
	}
	return lowest;
}

console.log("Part 2:", part2());
