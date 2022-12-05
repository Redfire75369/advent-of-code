import {readFileSync} from "fs";
import {join} from "path";

function parseInputs(filePath) {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n");
}

const samples = [1, 2].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
