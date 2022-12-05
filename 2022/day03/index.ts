import {sample, full} from "./inputs";

const inputs = full;

function priority(s: string) {
	if (s.charCodeAt(0) >= "a".charCodeAt(0)) {
		return s.charCodeAt(0) - "a".charCodeAt(0) + 1;
	} else {
		return s.charCodeAt(0) - "A".charCodeAt(0) + 27;
	}
}

/* Part 1 */
function part1() {
	return inputs.reduce((acc, input) => {
		const shared = input[0].filter(char => input[1].includes(char))[0];
		return acc + (shared ? priority(shared) : 0);
	}, 0);
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const inp: [string[], string[], string[]][] = [];
	inputs.forEach((v, i) => {
		const index = Math.floor(i / 3);
		if (inp[index] === undefined) {
			inp[index] = [[], [], []];
		}
		inp[index][i % 3] = [...v[0], ...v[1]];
	});

	return inp.reduce((acc, input) => {
		const shared = input[0].filter(char => input[1].includes(char) && input[2].includes(char))[0];
		return acc + (shared ? priority(shared) : 0);
	}, 0);
}

console.log("Part 2: " + part2());
