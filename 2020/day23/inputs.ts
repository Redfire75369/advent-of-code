import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = number[];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("").map(n => parseInt(n));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
