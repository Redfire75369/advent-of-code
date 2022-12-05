import { readFileSync } from "fs";
import { join } from "path";

interface Move {
	amount: number,
	from: number,
	to: number,
}

type Inputs = {
	initial: string[][],
	moves: Move[],
};

function parseInputs(filePath: string): Inputs {
	const [initial, moves] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).split("\n\n");
	const initial_lines = initial.split("\n");
	const initial_indices = initial_lines[initial_lines.length - 1];

	return {
		initial: initial_indices.trim().split(/\s+/g).map(i => {
			const index = initial_indices.indexOf(i);
			const stack = [];
			initial_lines.slice(0, initial_lines.length - 1).reverse().forEach(line => {
				if (line.charAt(index) !== " " && line.charAt(index) !== "") {
					stack.push(line.charAt(index));
				}
			});
			return stack;
		}),
		moves: moves.trim().split("\n").map(move => {
			const [_m, amount, _f, from, _t, to] = move.trim().split(" ");
			return {
				amount: parseInt(amount),
				from: parseInt(from) - 1,
				to: parseInt(to) - 1,
			};
		}),
	};
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
