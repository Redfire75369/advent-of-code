import {sample, full} from "./inputs.ts";

const inputs = full;

/* Part 1 */
function part1() {
	let sum = 0;

	for (let i = 0; i < inputs.length; i++) {
		let group = inputs[i];
		let answers = {};

		for (let j = 0; j < group.length; j++) {
			let questions = group[j].split("");

			for (let k = 0; k < questions.length; k++) {
				answers[questions[k]] = 0;
			}
		}

		sum += Object.keys(answers).length;
	}

	return sum;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let sum = 0;

	for (let i = 0; i < inputs.length; i++) {
		let groupAnswers = inputs[i].map(x => x.split(""));

		for (let i = "a"; i <= "z"; i = String.fromCharCode(i.charCodeAt(0) + 1)) {
			if (groupAnswers.every(x => x.includes(i))) {
				sum++;
			}
		}
	}

	return sum;
}

console.log("Part 2:", part2());
