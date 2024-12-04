import {samples, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.js";

const input = full;

/* Part 1 */
function part1() {
	const re = /mul\((\d+),(\d+)\)/g;
	return input.matchAll(re).reduce(sum(([_, a, b]) => {
		return parseInt(a) * parseInt(b);
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const re = /do\(\)|don\'t\(\)|mul\((\d+),(\d+)\)/g;
	let enabled = true;
	return input.matchAll(re).reduce(sum(([full, a, b]) => {
		if (full === "do()") {
			enabled = true;
		} else if (full == "don't()") {
			enabled = false;
		} else if (enabled) {
			return parseInt(a) * parseInt(b);
		}
		return 0;
	}), 0);
}

console.log("Part 2:", part2());
