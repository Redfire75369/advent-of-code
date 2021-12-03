import {sample, full} from "./inputs";

const inputs = full;

let preamble = inputs.splice(0, 25);

/* Part 1 */
function part1() {
	for (let i = 25; i < inputs.length; i++) {
		let x = inputs[i];
		let foundSum = false;
		for (let j = 0; j < preamble.length; j++) {
			for (let k = 0; k < preamble.length; k++) {
				if (j !== k && preamble[j] + preamble[k] === x) {
					foundSum = true;
				}
			}
		}
		if (!foundSum) {
			return x;
		}
		preamble = inputs.slice(i - 24, i + 1);
	}
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let x = 36845998;
	let index = inputs.indexOf(x);
	for (let i = 0; i < index; i++) {
		for (let j = i + 1; j < index; j++) {
			const sum = inputs.slice(i, j + 1).reduce((acc, cur) => acc + cur, 0);
			if (sum === x) {
				let y = inputs.slice(i, j + 1)
				return y[0] + y[y.length - 1];
			}
		}
	}
}

console.log("Part 2: " + part2());
