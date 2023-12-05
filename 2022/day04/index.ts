import {sample, full} from "./inputs.ts";

const inputs = full;

/* Part 1 */
function part1() {
	return inputs.reduce((acc, cur) => {
		const [{start: s1, end: e1}, {start: s2, end: e2}] = cur;
		const cond = (s1 <= s2 && e1 >= e2) || (s2 <= s1 && e2 >= e1);
		return acc + (cond ? 1 : 0);
	}, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return inputs.reduce((acc, cur) => {
		const [{start: s1, end: e1}, {start: s2, end: e2}] = cur;
		const cond = (s1 <= s2 && e1 >= e2) || (s2 <= s1 && e2 >= e1)
			|| (s1 <= s2 && s2 <= e1) || (s1 <= e2 && e2 <= e1);
		return acc + (cond ? 1 : 0);
	}, 0);
}

console.log("Part 2:", part2());
