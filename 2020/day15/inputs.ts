import {readFileSync} from "fs";
import {join} from "path";

function parseInputs(filePath) {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split(",").map(v => parseInt(v));
}

const samples = [1, 2, 3, 4, 5, 6].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
