import {sample, full} from "./inputs";
import {sum} from "../../utils/reducer";
import {charCode} from "../../utils/char";

const inputs = full;

function priority(s: string): number {
	return charCode(s) + (charCode(s) > 0x60 ? 0 : 26);
}

/* Part 1 */
function part1() {
	return inputs.reduce((acc, input) => {
		return acc + input[0].filter(char => input[1].includes(char)).reduce(sum(priority), 0);
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
		return acc + input[0].filter(char => input[1].includes(char) && input[2].includes(char)).reduce(sum(priority), 0);
	}, 0);
}

console.log("Part 2: " + part2());
