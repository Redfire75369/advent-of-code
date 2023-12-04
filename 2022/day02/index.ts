import {sample, full} from "./inputs";
import {alphabetCode} from "../../utils/char.ts";

const inputs = full;

/* Part 1 */
function part1() {
	const wins = {
		"A": "Y",
		"B": "Z",
		"C": "X",
	};

	return inputs.reduce((a, c) => {
		const [c1, c2] = c;
		const s1 = alphabetCode(c2) - 23;
		const s2 = wins[c1] === c2 ? 6 : (alphabetCode(c1) === s1 ? 3 : 0);
		return a + s1 + s2;
	}, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const situations = {
		"A": {
			"X": "C",
			"Y": "A",
			"Z": "B",
		},
		"B": {
			"X": "A",
			"Y": "B",
			"Z": "C",
		},
		"C": {
			"X": "B",
			"Y": "C",
			"Z": "A",
		}
	};

	return inputs.reduce((a, c) => {
		const [c1, c2] = c;
		const s1 = alphabetCode(situations[c1][c2]);
		const s2 = 3 * (alphabetCode(c2) - 24);
		return a + s1 + s2;
	}, 0);
}

console.log("Part 2:", part2());
