import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	let value = 1;
	let cycle = 0;

	return inputs.reduce((acc, input) => {
		let signal = 0;

		for (let i = 0; i < input.length; i++) {
			cycle++
			if (cycle === 20 || (cycle - 20) % 40 === 0) {
				signal = cycle * value;
			}
		}

		value += input[1] ?? 0;

		return acc + signal;
	}, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const crt = ".".repeat(6).split("").map(_ => ".".repeat(40).split(""));
	let value = 1;
	let cycle = 0;

	inputs.forEach(input => {
		for (let i = 0; i < input.length; i++) {
			const xPosition = cycle % 40;
			if (xPosition === value - 1 || xPosition === value || xPosition === value + 1) {
				const yPosition = Math.floor(cycle / 40);
				crt[yPosition][xPosition] = "#";
			}
			cycle++
		}
		value += input[1] ?? 0;
	});

	return crt.map(line => line.join("")).join("\n");
}

console.log("Part 2:")
console.log(part2());
