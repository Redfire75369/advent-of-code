import { readFileSync } from "fs";
import { join } from "path";

type Inputs = [string[], string[]][];

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
