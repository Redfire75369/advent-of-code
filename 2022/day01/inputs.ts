import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.ts";

type Inputs = number[][];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(line => line.trim().split("\n").map(String.prototype.trim).map(int()));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
