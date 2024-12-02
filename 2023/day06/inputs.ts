import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.ts";

type Inputs = [number[], number[]];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [times, distances] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => line.split(/\s+/).slice(1).map(int()));
	return [times, distances];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
