import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): [string[][], [string, number][]] {
	const sections = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");

	// @ts-ignore
	const dots: [number, number][] = sections[0].split("\n").map(x => x.split(",").map(n => parseInt(n)));
	const [maxX, maxY] = [Math.max(...dots.map(x => x[0])), Math.max(...dots.map(x => x[1]))];
	const grid = new Array(maxY + 1).fill(new Array(maxX + 1).fill(".")).map(x => [...x]);
	dots.forEach(([x, y]) => {
		grid[y][x] = "#";
	});

	const folds: [string, number][] = sections[1].split("\n").map(l => l.split("fold along ")[1].split("="))
		.map(([axis, value]) => [axis, parseInt(value)]);

	return [grid, folds];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
