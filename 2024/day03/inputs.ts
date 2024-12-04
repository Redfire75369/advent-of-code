import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Input = string;

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Input {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim();
}

const samples = [1, 2].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
