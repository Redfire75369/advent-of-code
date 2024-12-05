import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.js";

const [rules, updates] = full;

/* Part 1 */
function part1() {
	return updates.reduce(sum(update => {
		for (const [before, after] of rules) {
			const beforeIndex = update.indexOf(before);
			const afterIndex = update.indexOf(after);
			if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) {
				return 0;
			}
		}
		return update[(update.length - 1) / 2];
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return updates.reduce(sum(update => {
		const newUpdate = update.toSorted((a, b) => {
			for (const [before, after] of rules) {
				if (a === before && b === after) {
					return -1;
				} else if (a === after && b === before) {
					return 1;
				}
			}
			return 0;
		});
		return newUpdate[(update.length - 1) / 2];
	}), 0) - part1();
}

console.log("Part 2:", part2());
