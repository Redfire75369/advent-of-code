import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

export type Value = number | Value[];
export type Pair = [Value, Value];

type Inputs = Pair[];

const __dirname = dirname(fileURLToPath(import.meta.url));
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
