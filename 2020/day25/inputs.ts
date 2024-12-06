import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.js";

type Inputs = [number, number];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [card, door] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n").map(int());
	return [card, door];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
