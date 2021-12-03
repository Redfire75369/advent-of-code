import { readFileSync } from "fs";
import { join } from "path";

function parseInputs(filePath): [number, number[]] {
	const inputs = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).split("\n").slice(0, -1).join("\n").split("\n");
	return [parseInt(inputs[0]), inputs[1].split(",").map(v => parseInt(v))]
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
