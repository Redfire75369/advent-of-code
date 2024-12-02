import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

function test(series: number[]): boolean {
	const sign = Math.sign(series[1] - series[0]);
	return series.slice(1).reduce((acc, c, i) => {
		const diff = c - series[i];
		return acc && (diff === sign || diff === sign * 2 || diff === sign * 3);
	}, true);
}

/* Part 1 */
function part1() {
	return inputs.reduce(sum(c => test(c) ? 1 : 0), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return inputs.reduce(sum(c => {
		const safe = test(c) || c.reduce((acc, _, i) => {
			return acc || test(c.toSpliced(i, 1));
		}, false);
		return safe ? 1 : 0;
	}), 0);
}

console.log("Part 2:", part2());
