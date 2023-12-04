import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [string[], string[]][];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const [bp1, bp2] = [line.trim().slice(0, line.trim().length / 2), line.trim().slice(line.trim().length / 2, line.trim().length)];
			return [bp1.split(""), bp2.split("")];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
