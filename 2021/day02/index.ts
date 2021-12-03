console.log(__dirname);

import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	let position = 0;
	let depth = 0;

	for (let i = 0; i < inputs.length; i++) {
		const [cmd, val] = inputs[i]

		switch (cmd) {
			case "forward":
				position += val;
				break;
			case "down":
				depth += val;
				break
			case "up":
				depth -= val;
				break;
		}
	}

	return position * depth;
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let position = 0;
	let depth = 0;
	let aim = 0;

	for (let i = 0; i < inputs.length; i++) {
		const [cmd, val] = inputs[i]

		switch (cmd) {
			case "forward":
				position += val;
				depth += aim * val;
				break;
			case "down":
				aim += val;
				break
			case "up":
				aim -= val;
				break;
		}
	}

	return position * depth;
}

console.log("Part 2: " + part2());
