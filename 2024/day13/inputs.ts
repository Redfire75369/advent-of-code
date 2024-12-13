import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [[number, number], [number, number], [number, number]][];

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(block => {
			const [a, b, p] = block.split("\n").map(line => line.split(", "));
			return [
				[
					parseInt(a[0].slice("Button A: X+".length)),
					parseInt(a[1].slice("Y+".length)),
				],
				[
					parseInt(b[0].slice("Button A: X+".length)),
					parseInt(b[1].slice("Y+".length)),
				],
				[
					parseInt(p[0].slice("Prize: X=".length)),
					parseInt(p[1].slice("Y=".length)),
				]
			]
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
