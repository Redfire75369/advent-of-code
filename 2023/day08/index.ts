import {samples, full} from "./inputs.ts";
import {lcm} from "../../utils/reducer.js";

const inputs = full;

/* Part 1 */
function part1() {
	if (inputs[1]["AAA"] === undefined) {
		return Infinity;
	}

	let index = 0;
	let current = "AAA";
	while (true) {
		const direction = inputs[0][index % inputs[0].length];
		index++;
		current = inputs[1][current][direction];
		if (current === "ZZZ") {
			return index;
		}
	}
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const current = Object.keys(inputs[1]).filter(s => s.endsWith("A"));

	return current.reduce(lcm(start => {
		let current = start;
		let index = 0;

		while (true) {
			const direction = inputs[0][index % inputs[0].length];
			index++;
			current = inputs[1][current][direction];
			if (current.endsWith("Z")) {
				return index;
			}
		}
	}), 1);
}

console.log("Part 2:", part2());
