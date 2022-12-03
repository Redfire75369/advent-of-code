import {sample, full} from "./inputs";

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
		const s1 = c2.charCodeAt(0) - 87;
		let s2 = (c1 == String.fromCharCode(c2.charCodeAt(0) - 23)) ? 3 : (wins[c1] == c2) ? 6 : 0;
		return a + s1 + s2;
	}, 0);
}

console.log("Part 1: " + part1());

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
	const match_points = {
		"X": 0,
		"Y": 3,
		"Z": 6,
	};
	return inputs.reduce((a, c) => {
		const [c1, c2] = c;
		const play = situations[c1][c2];
		const s1 = play.charCodeAt(0) - "A".charCodeAt(0) + 1;
		const s2 = match_points[c2];
		return a + s1 + s2;
	}, 0);
}

console.log("Part 2: " + part2());
