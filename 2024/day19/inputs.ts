import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [string[], string[]];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [patterns, towels] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	return [
		patterns.split(", "),
		towels.split("\n"),
	];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
