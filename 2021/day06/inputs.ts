import {readFileSync} from "fs";
import {join} from "path";

function parseInputs(filePath) {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split(",").map(f => parseInt(f));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
