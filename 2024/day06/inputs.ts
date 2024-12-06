import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [[number, number], boolean[][]];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const guard: [number, number] = [0, 0];
	const obstacles = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map((line, y) => line.split("").map((c, x) => {
			if (c === "^") {
				guard[0] = x;
				guard[1] = y;
			}
			return c === "#";
		}));
	return [guard, obstacles];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
