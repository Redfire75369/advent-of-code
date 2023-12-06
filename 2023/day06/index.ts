import {sample, full} from "./inputs.ts";
import {zip} from "../../utils/iterator.js";

const inputs = full;

function computeWins(time: number, distance: number) {
	let start;
	let end;

	for (let t = 0; t < time; t++) {
		if (distance < (time - t) * t) {
			start = t;
			break;
		}
	}
	for (let t = time - 1; t > 0; t--) {
		if (distance < (time - t) * t) {
			end = t;
			break;
		}
	}
	return end - start + 1;
}

/* Part 1 */
function part1() {
	let margin = 1;
	for (const [time, distance] of zip(inputs[0], inputs[1])) {
		margin *= computeWins(time, distance);
	}
	return margin;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const time = parseInt(inputs[0].join(""));
	const distance = parseInt(inputs[1].join(""));

	return computeWins(time, distance);
}

console.log("Part 2:", part2());
