import {readFileSync} from "fs";
import {join} from "path";
import {int} from "../../utils/int";

interface Monkey {
	items: number[],
	operation: (number) => number,
	test: number,
	throwTo: [number, number],
}

type Inputs = Monkey[];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(monkey => {
			const lines = monkey.split("\n").map(s => s.trim());

			const starting = lines[1].slice("Starting items: ".length).trim().split(", ").map(int());
			const operation = lines[2].slice("Operation: new = old ".length).trim();
			const test = parseInt(lines[3].slice("Test: divisible by ".length).trim());
			const throwTrue = parseInt(lines[4].slice("If True: throw to monkey ".length).trim());
			const throwFalse = parseInt(lines[5].slice("If False: throw to monkey ".length).trim());

			function operationFunction(worry: number): number {
				if (operation.startsWith("+ ")) {
					const number = parseInt(operation.slice("+ ".length));
					return worry + (isNaN(number) ? worry : number);
				} else if (operation.startsWith("* ")) {
					const number = parseInt(operation.slice("* ".length));
					return worry * (isNaN(number) ? worry : number);
				}
				throw new Error(`Illegal Operation ${operation}`);
			}

			return {
				items: starting,
				operation: operationFunction,
				test,
				throwTo: [throwFalse, throwTrue],
			};
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
