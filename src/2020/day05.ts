import read_input from "../utils";

const input = read_input(2020, 5, true);
const inputs = input.split("\n").map(x => x.split(""));

/* Part 1 */
function part1() {
	return Math.max(...inputs.map(input => {
		const row = parseInt(input.slice(0, 7).map(w => w === "F" ? 0 : 1).join(""), 2);
		const column = parseInt(input.slice(7, 10).map(w => w === "L" ? 0 : 1).join(""), 2);
		return row * 8 + column;
	}));
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let result;
	inputs.map(input => {
		const row = parseInt(input.slice(0, 7).map(w => w === "F" ? 0 : 1).join(""), 2);
		const column = parseInt(input.slice(7, 10).map(w => w === "L" ? 0 : 1).join(""), 2);
		return row * 8 + column;
	}).sort((a, b) => {
		return a - b;
	}).forEach((v, i, array) => {
		if (result === undefined) {
			if (array[i - 1] !== v - 1 && array[i - 1] !== undefined) {
				result = v - 1;
			} else if (array[i + 1] !== v + 1 && array[i + 1] !== undefined) {
				result = v + 1;
			}
		}
	});

	return result;
}

console.log("Part 2: " + part2());
