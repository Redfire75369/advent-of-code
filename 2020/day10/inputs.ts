import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string) {
	let inputs =  readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n").map(v => parseInt(v)).sort((a, b) => a - b);
	inputs.push(Math.max(...inputs) + 3);
	inputs.unshift(0);
	return inputs;
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
