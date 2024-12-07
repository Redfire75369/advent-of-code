import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

/* Part 1 */
function part1() {
	function check(test: number, current: number, index: number, numbers: number[]): boolean {
		if (index === numbers.length) {
			return current === test;
		}
		return check(test, current + numbers[index], index + 1, numbers)
			|| check(test, current * numbers[index], index + 1, numbers);
	}

	return inputs.reduce(sum(([test, numbers]) => check(test, numbers[0], 1, numbers) ? test : 0), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function check(test: number, current: number, index: number, numbers: number[]): boolean {
		if (index === numbers.length) {
			return current === test;
		}

		const next = numbers[index];
		return check(test, current + next, index + 1, numbers)
			|| check(test, current * next, index + 1, numbers)
			|| check(test, current * 10 ** (1 + Math.floor(Math.log10(next))) + next, index + 1, numbers);
	}

	return inputs.reduce(sum(([test, numbers]) => check(test, numbers[0], 1, numbers) ? test : 0), 0);
}

console.log("Part 2:", part2());
