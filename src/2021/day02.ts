import read_input from "../utils";

const input = read_input(2021, 2, true);
const inputs = input.split("\n");

/* Part 1 */
function part1() {
	let position = 0;
	let depth = 0;
	for (let i = 0; i < inputs.length; i++) {
		const [cmd, val] = inputs[i].split(" ");
		const num = parseInt(val);

		switch (cmd) {
			case "forward":
				position += num;
				break;
			case "up":
				depth -= num;
				break;
			case "down":
				depth += num;
				break
		}
	}

	return position * depth;
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let position = 0;
	let depth = 0;
	let aim = 0;
	for (let i = 0; i < inputs.length; i++) {
		const [cmd, val] = inputs[i].split(" ");
		const num = parseInt(val);

		switch (cmd) {
			case "forward":
				position += num;
				depth += aim * num;
				break;
			case "up":
				aim -= num;
				break;
			case "down":
				aim += num;
				break
		}
	}

	return position * depth;
}

console.log("Part 2: " + part2());
