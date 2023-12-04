import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): [string[], string[][]] {
	let rows = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n");
	return [rows, rows.map(v => v.split(""))];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
