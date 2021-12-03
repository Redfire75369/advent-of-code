import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	for (let i = 0; i < inputs.length; i++) {
		for (let j = 0; j < inputs.length; j++) {
			if (inputs[i] + inputs[j] === 2020) {
				return inputs[i] * inputs[j];
			}
		}
	}
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	for (let i = 0; i < inputs.length; i++) {
		for (let j = 0; j < inputs.length; j++) {
			for (let k = 0; k < inputs.length; k++) {
				if (inputs[i] + inputs[j] + inputs[k] === 2020) {
					return inputs[i] * inputs[j] * inputs[k];
				}
			}
		}
	}
}

console.log("Part 2: " + part2());
