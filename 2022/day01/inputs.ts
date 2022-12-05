import { readFileSync } from "fs";
import { join } from "path";

type Inputs = number[][];

function parseInputs(filePath): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(line => line.trim().split("\n").map(calories => parseInt(calories.trim())));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
