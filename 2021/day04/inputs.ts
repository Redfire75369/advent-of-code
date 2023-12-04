import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): [string[], string[][][], boolean[][][]] {
	const sections = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	const order = sections[0].split(",");
	const grids = sections.slice(1).map(v => v.trim().split("\n").map(v => v.trim().split(/\s/g)));
	const marked = grids.map(v => v.map(v => v.map(v => false)));
	return [order, grids, marked];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
