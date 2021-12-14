import { readFileSync } from "fs";
import { join } from "path";

function parseInputs(filePath): [string, {[key: string]: string}] {
	const sections = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	const template = sections[0];
	const insertionRules = {};
	sections[1].split("\n").forEach(l => {
		const [pair, element] = l.split(" -> ");
		insertionRules[pair] = element;
	});

	return [template, insertionRules];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
