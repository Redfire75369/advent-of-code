import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	const totals = inputs.map(cal => cal.reduce((a, c) => a + c, 0));
	return Math.max(...totals);
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const totals = inputs.map(cal => cal.reduce((a, c) => a + c, 0));
	return totals.sort((a, b) => b - a).slice(0, 3).reduce((acc, cur) => acc + cur, 0);
}

console.log("Part 2: " + part2());
