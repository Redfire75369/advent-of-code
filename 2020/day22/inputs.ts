import {readFileSync} from "fs";
import {join} from "path";
import {int} from "../../utils/int";

type Inputs = number[][];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(player => player.split("\n").slice(1).map(int()));
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
