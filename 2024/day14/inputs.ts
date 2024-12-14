import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [[number, number], [number, number]][];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const [p, v] = line.split(" ").map(a => a.split(","));
			return [
				[parseInt(p[0].slice(2)), parseInt(p[1])],
				[parseInt(v[0].slice(2)), parseInt(v[1])],
			];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
