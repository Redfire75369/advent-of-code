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
	const top = Math.max(...totals);
	const totals2 = totals.filter(t => t !== top);
	console.log(totals.length, totals2.length);
	const top2 = Math.max(...totals2);
	const totals3 = totals2.filter(t => t !== top2);
	const top3 = Math.max(...totals3);
	return top + top2 + top3;
}

console.log("Part 2: " + part2());
