import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const [patterns, towels] = full;

/* Part 1 */
function part1() {
	function check(towel: string): boolean {
		if (towel === "") {
			return true;
		}

		for (const pattern of patterns) {
			if (towel.startsWith(pattern) && check(towel.slice(pattern.length))) {
				return true;
			}
		}
		return false;
	}

	return towels.reduce(sum(towel => check(towel) ? 1 : 0), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const counts = new Map();
	function check(towel: string): number {
		if (towel === "") {
			return 1;
		}

		if (counts.has(towel)) {
			return counts.get(towel);
		}

		let ways = 0;
		for (const pattern of patterns) {
			if (towel.startsWith(pattern)) {
				ways += check(towel.slice(pattern.length));
			}
		}
		counts.set(towel, ways);
		return ways;
	}

	return towels.reduce(sum((towel, i) => check(towel)), 0);
}

console.log("Part 2:", part2());
