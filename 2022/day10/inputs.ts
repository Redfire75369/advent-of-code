import {readFileSync} from "fs";
import {join} from "path";

type Inputs = ([string] | [string, number])[];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const [instruction, amount] = line.split(" ");
			if (amount === undefined) {
				return [instruction];
			}
			return [instruction, parseInt(amount)];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
