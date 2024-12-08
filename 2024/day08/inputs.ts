import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [[number, number], {[key: string]: [number, number][]}];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const grid = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n").map(line => line.split(""));
	const antennas: Inputs[1] = {};
	grid.forEach((row, y) => row.forEach((cell, x) => {
		if (cell !== ".") {
			antennas[cell] ??= [];
			antennas[cell].push([x, y]);
		}
	}))


	return [[grid[0].length, grid.length], antennas];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
