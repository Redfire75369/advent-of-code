import {readFileSync} from "fs";
import {join} from "path";
import {int} from "../../utils/int";

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
	const lines = initial.split("\n");
	const indices = lines[lines.length - 1];

	return {
		initial: indices.trim().split(/\s+/g).map(i => {
			const index = indices.indexOf(i);
			const stack = [];
			lines.slice(0, lines.length - 1).reverse().forEach(line => {
				if (line.charAt(index) !== " " && line.charAt(index) !== "") {
					stack.push(line.charAt(index));
				}
			});
			return stack;
		}),
		moves: moves.trim().split("\n").map(move => {
			const [_m, amount, _f, from, _t, to] = move.trim().split(" ").map(int());
			return {
				amount: amount,
				from: from - 1,
				to: to - 1,
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
