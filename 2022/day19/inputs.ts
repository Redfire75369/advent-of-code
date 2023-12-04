import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

export interface Blueprint {
	ore: number,
	clay: number,
	obsidian: [number, number],
	geodes: [number, number],
}

type Inputs = Blueprint[];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(blueprint => {
			const words = blueprint.split(" ");
			return {
				ore: parseInt(words[6]),
				clay: parseInt(words[12]),
				obsidian: [parseInt(words[18]), parseInt(words[21])],
				geodes: [parseInt(words[27]), parseInt(words[30])]
			};
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
