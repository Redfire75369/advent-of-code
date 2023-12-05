import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.ts";

type Inputs = [number, number[], number[]][];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const [card, numbers] = line.split(/:\s+/);
			const id = parseInt(card.split(/\s+/)[1]);
			const [winning, current] = numbers.split(/\s+\|\s+/)
				.map(numbers => numbers.split(/\s+/).map(int()));
			return [id, winning, current];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
