import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.js";

const inputs = full;

function solve(offset: number) {
	return inputs.reduce(sum(([[ax, ay], [bx, by], [px, py]]) => {
		const det = (ax * by - bx * ay);
		const a = by * (px + offset) - bx * (py + offset);
		const b = ax * (py + offset) - ay * (px + offset);
		if (a % det === 0 && b % det === 0) {
			return (3 * a + b) / det;
		}
		return 0;
	}), 0);
}

/* Part 1 */
function part1() {
	return solve(0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return solve(10000000000000);
}

console.log("Part 2:", part2());
