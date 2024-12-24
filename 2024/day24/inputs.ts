import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [Record<string, boolean>, Record<string, [string, string, string]>];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [start, instructions] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");

	const wires: Record<string, boolean> = {};
	for (const line of start.split("\n")) {
		const [w, v] = line.split(": ");
		wires[w] = Boolean(parseInt(v));
	}

	const inst: Record<string, [string, string, string]> = {};
	for (const line of instructions.split("\n")) {
		const [a, i, b, _, o] = line.split(" ");
		inst[o] = [a, b, i];
	}

	return [wires, inst];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
