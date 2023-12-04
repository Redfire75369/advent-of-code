import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [string, number][];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const [move, amount] = line.trim().split(" ");
			return [move, parseInt(amount)];
		});
}

const samples = [1, 2].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
