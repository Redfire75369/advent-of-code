import {sample, full} from "./inputs";
import {product, sum} from "../../utils/reducer";

const inputs = full;

/* Part 1 */
function part1() {
	return inputs.reduce(sum((line: string, i) => {
		let cur = 0;
		return line.split(/[^0-9]/)
			.filter(s => s.length !== 0)
			.reduce(sum(s => {
				const index = line.indexOf(s, cur);
				cur = index + 1;

				for (let y = Math.max(0, i - 1); y <= Math.min(inputs.length - 1, i + 1); y++) {
					for (let x = Math.max(0, index - 1); x <= Math.min(line.length - 1, index + s.length); x++) {
						const char = inputs[y][x];
						if (char !== "." && !/\d/.test(char)) {
							return parseInt(s);
						}
					}
				}
				return 0;
			}), 0);
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function getNumber(input: string, x: number) {
		const arr = [input[x]];
		let index = x;
		while (index >= 0 && /\d/.test(input[--index])) {
			arr.unshift(input[index]);
		}
		index = x;
		while (index < input.length && /\d/.test(input[++index])) {
			arr.push(input[index]);
		}
		return parseInt(arr.join(""));
	}

	return inputs.reduce(sum((line: string, i) => {
		const gears = [];
		for (let j = 0; j < line.length; j++) {
			if (line[j] === "*") {
				const numbers = [[], [], []];

				if (i > 0) {
					for (let x = j - 1; x <= j + 1; x++) {
						if (x < 0 || x >= line.length || inputs[i - 1][x] === ".") {
							numbers[0].push(NaN);
						} else {
							numbers[0].push(getNumber(inputs[i - 1], x));
						}
					}
				}
				for (let x = j - 1; x <= j + 1; x++) {
					if (x !== j) {
						if (x < 0 || x >= line.length || line[x] === ".") {
							numbers[1].push(NaN);
						} else {
							numbers[1].push(getNumber(line, x));
						}
					}
				}
				if (i < inputs.length - 1) {
					for (let x = j - 1; x <= j + 1; x++) {
						if (x < 0 || x >= line.length || inputs[i + 1][x] === ".") {
							numbers[2].push(NaN);
						} else {
							numbers[2].push(getNumber(inputs[i + 1], x));
						}
					}
				}

				const final = [];

				for (const i of [0, 2]) {
					if (isNaN(numbers[i][1])) {
						if (!isNaN(numbers[i][0])) {
							final.push(numbers[i][0]);
						}
						if (!isNaN(numbers[i][2])) {
							final.push(numbers[i][2]);
						}
					} else if (!isNaN(numbers[i][0])) {
						final.push(numbers[i][0]);
					} else if (!isNaN(numbers[i][2])) {
						final.push(numbers[i][2]);
					} else {
						final.push(numbers[i][1]);
					}
				}

				if (!isNaN(numbers[1][0])) {
					final.push(numbers[1][0]);
				}
				if (!isNaN(numbers[1][1])) {
					final.push(numbers[1][1]);
				}

				if (final.length === 2) {
					gears.push(final.reduce(product(), 1));
				}
			}
		}
		return gears.reduce(sum(), 0);
	}), 0);
}

console.log("Part 2:", part2());
