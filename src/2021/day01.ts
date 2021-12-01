import read_input from "../utils";

const input = read_input(2021, 1, true);
const inputs = input.split("\n").map(v => parseInt(v));

/* Part 1 */
function part1() {
	let ret = 0;
	for (let i = 1; i < inputs.length; i++) {
		if (inputs[i] > inputs[i - 1]) {
			ret++
		}
	}
	return ret;
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let ret = 0;
	for (let i = 3; i < inputs.length; i++) {
		if (inputs[i] > inputs[i - 3]) {
			ret++
		}
	}
	return ret;
}

console.log("Part 2: " + part2());
