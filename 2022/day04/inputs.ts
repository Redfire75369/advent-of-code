import {readFileSync} from "fs";
import {join} from "path";

interface Range {
	start: number,
	end: number
}

type Inputs = [Range, Range][];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const ranges = line.trim().split(",");
			const [s1, e1] = ranges[0].trim().split("-");
			const [s2, e2] = ranges[1].trim().split("-");
			return [
				{
					start: parseInt(s1),
					end: parseInt(e1),
				},
				{
					start: parseInt(s2),
					end: parseInt(e2),
				},
			];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
