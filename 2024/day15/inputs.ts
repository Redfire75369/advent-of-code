import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [string[][], [number, number], string[]];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [grid, instructions] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	let robot: [number, number] = [0, 0];

	return [
		grid.split("\n").map((line, y) => {
			return line.split("").map((c, x) => {
				if (c === "@") {
					robot = [x, y];
				}
				return c;
			});
		}),
		robot,
		instructions.split("\n").join("").split(""),
	]

}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
