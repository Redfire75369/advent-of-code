import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	let successful = 0;

	for (let i = 0; i < inputs.length; i++) {
		const line = inputs[i];
		const amount = line[2].split("").filter(y => y === line[1][0]).length;
		const validator = line[0].split("-").map(x => parseInt(x));
		if (validator[0] <= amount && amount <= validator[1]) {
			successful++;
		}
	}

	return successful;
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let successful = 0;

	for (let i = 0; i < inputs.length; i++) {
		const line = inputs[i];
		const validator = line[0].split("-").map(x => parseInt(x));
		if ((line[2][validator[0] - 1] === line[1][0] || line[2][validator[1] - 1] === line[1][0])
			&& !(line[2][validator[0] - 1] === line[1][0] && line[2][validator[1] - 1] === line[1][0])) {
			successful++;
		}
	}

	return successful;
}

console.log("Part 2: " + part2());
