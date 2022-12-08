import {readFileSync} from "fs";
import {join} from "path";

interface Food {
	ingredients: string[],
	allergies: string[],
}

type Inputs = Food[];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const [ingredients, allergies] = line.split(" (");
			return {
				ingredients: ingredients.split(" "),
				allergies: allergies.substring("contains ".length, allergies.length - 1).split(", "),
			};
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
