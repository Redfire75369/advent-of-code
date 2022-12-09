import {readFileSync} from "fs";
import {join} from "path";

type Inputs = string[];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("");
}

const samples = [1, 2, 3, 4, 5].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
