import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string) {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split(",").map(v => parseInt(v));
}

const samples = [1, 2, 3, 4, 5, 6].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
