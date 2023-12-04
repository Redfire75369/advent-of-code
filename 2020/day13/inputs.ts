import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): [number, number[]] {
	const inputs = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n");
	return [parseInt(inputs[0]), inputs[1].split(",").map(v => parseInt(v))]
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
