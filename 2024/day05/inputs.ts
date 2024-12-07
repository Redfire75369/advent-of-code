import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.ts";

type Inputs = [[number, number][], number[][]];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [rules, updates] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	return [
		rules.split("\n").map(rule => {
			const [before, after] = rule.split("|").map(int());
			return [before, after];
		}),
		updates.trim().split("\n").map(update => update.split(",").map(int())),
	]
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
