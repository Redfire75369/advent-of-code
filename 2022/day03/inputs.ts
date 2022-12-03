import { readFileSync } from "fs";
import { join } from "path";

function parseInputs(filePath) {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(s => [s.trim().slice(0, s.trim().length / 2), s.trim().slice(s.trim().length / 2, s.trim().length)]
			.map(s => s.split("")));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
