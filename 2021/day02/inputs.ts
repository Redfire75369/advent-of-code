import { readFileSync } from "fs";
import { join } from "path";

function parseInputs(filePath): [string, number][] {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n").map(v => v.split(" ")).map(v => [v[0], parseInt(v[1])]);
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
