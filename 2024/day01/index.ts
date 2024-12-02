import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;
const first = inputs[0].toSorted();
const second = inputs[1].toSorted();

/* Part 1 */
function part1() {
	return first.reduce(sum((c, i) => Math.abs(second[i] - c)), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return first.reduce(sum(c => c * second.filter(v => v === c).length), 0);
}

console.log("Part 2:", part2());
