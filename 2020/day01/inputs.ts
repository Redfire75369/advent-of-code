import { readFileSync } from "fs";
import { join } from "path";

function parseInputs(filePath) {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).split("\n").map(v => parseInt(v));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};