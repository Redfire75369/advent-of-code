import {samples, full} from "./inputs";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

/* Part 1 */
function part1() {
	return inputs.reduce(sum(line => {
		let res = [];
		for (const char of line.split("")) {
			if (!isNaN(parseInt(char))) {
				res.push(char);
			}
		}
		return parseInt([res[0], res.at(-1)].join(""));
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const numbers = {
		"zero": "0",
		"one": "1",
		"two": "2",
		"three": "3",
		"four": "4",
		"five": "5",
		"six": "6",
		"seven": "7",
		"eight": "8",
		"nine": "9",
	};

	return inputs.reduce(sum(line => {
		let res = [];

		const chars = line.split("");
		for (let i = 0; i < chars.length; i++) {
			if (!isNaN(parseInt(chars[i]))) {
				res.push(chars[i]);
			} else {
				for (const number in numbers) {
					if (line.substring(i).startsWith(number)) {
						res.push(numbers[number]);
					}
				}
			}
		}
		return parseInt([res[0], res.at(-1)].join(""));
	}), 0);
}

console.log("Part 2:", part2());
