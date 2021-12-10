import {sample, full} from "./inputs";

const inputs = full;

const open = ["(", "[", "{", "<"];
const close = [")", "]", "}", ">"];

/* Part 1 */
function part1() {
	const scores = [3, 57, 1197, 25137];
	const corrupted = [];
	inputs.forEach(input => {
		const stack = [];
		for (let i = 0; i < input.length; i++) {
			const char = input[i];
			if (open.includes(char)) {
				stack.push(char);
			} else if (close.includes(char)) {
				const openIndex = open.indexOf(stack[stack.length - 1]);
				const closeIndex = close.indexOf(char);

				if (openIndex == closeIndex) {
					stack.pop();
				} else {
					corrupted.push(char);
					break;
				}
			}
		}
	});


	return corrupted.reduce((acc, char) => {
		const index = close.indexOf(char);
		return acc + scores[index];
	}, 0);
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const scores = [1, 2, 3, 4];
	const incomplete: string[][] = inputs.map(input => {
		const stack = [];
		for (let i = 0; i < input.length; i++) {
			const char = input[i];
			if (open.includes(char)) {
				stack.push(char);
			} else if (close.includes(char)) {
				const openIndex = open.indexOf(stack[stack.length - 1]);
				const closeIndex = close.indexOf(char);

				if (openIndex == closeIndex) {
					stack.pop();
				} else {
					return null;
				}
			}
		}
		return stack;
	}).filter(stack => stack !== null);

	const finalScores = incomplete.map(stack => {
		return stack.reverse().reduce((acc, char) => {
			const index = open.indexOf(char);
			return acc * 5 + scores[index];
		}, 0);
	});


	const sorted = finalScores.sort((a, b) => a - b);
	return sorted[(sorted.length - 1) / 2];
}

console.log("Part 2: " + part2());
