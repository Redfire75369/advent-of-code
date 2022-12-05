import {readFileSync} from "fs";
import {join} from "path";
import {int} from "../../utils/int";

type Inputs = number[][];

function parseInputs(filePath): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(line => line.trim().split("\n").map(String.prototype.trim).map(int()));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
