import {readFileSync} from "fs";
import {join} from "path";

export type Value = number | Value[];
export type Pair = [Value, Value]

type Inputs = Pair[];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(s => {
			const lines = s.split("\n");
			return [
				eval(lines[0]),
				eval(lines[1]),
			];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
