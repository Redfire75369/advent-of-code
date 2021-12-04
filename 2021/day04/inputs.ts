import { readFileSync } from "fs";
import { join } from "path";

function parseInputs(filePath): [string[], string[][][], boolean[][][]] {
	const sections = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).split("\n").slice(0, -1).join("\n").split("\n\n");
	const order = sections[0].split(",");
	const grids = sections.slice(1).map(v => v.replaceAll("\n ", "\n")
		.replaceAll(`  `, " ").trim()
		.split("\n").map(v => v.split(" ")));
	const marked = grids.map(v => v.map(v => v.map(v => false)));
	return [order, grids, marked];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
