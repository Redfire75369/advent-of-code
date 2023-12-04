import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.ts";

interface Range {
	start: number,
	end: number
}

type Inputs = [Range, Range][];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const ranges = line.trim().split(",");
			const [s1, e1] = ranges[0].trim().split("-").map(int());
			const [s2, e2] = ranges[1].trim().split("-").map(int());
			return [
				{start: s1, end: e1},
				{start: s2, end: e2},
			];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
