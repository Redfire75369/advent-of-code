import { readFileSync } from "fs";
import { join } from "path";

function parseInputs(filePath): [string[], string[][]] {
	let rows = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n");
	return [rows, rows.map(v => v.split(""))];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
