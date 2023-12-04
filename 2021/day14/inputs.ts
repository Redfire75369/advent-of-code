import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): [string, {[key: string]: string}] {
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
