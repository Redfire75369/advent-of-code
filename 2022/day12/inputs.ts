import {readFileSync} from "fs";
import {join} from "path";
import {alphabetCode} from "../../utils/char";

type Inputs = {
	start: [number, number],
	end: [number, number],
	heights: number[][],
};

function getCoordinateOfString(lines: string[][], string: string): [number, number] {
	return lines.reduce((acc: [number, number], line, y) => {
		if (acc[0] !== -1) {
			return acc;
		}
		if (line.indexOf(string) !== -1) {
			return [line.indexOf(string), y];
		}
		return [-1, -1];
	}, [-1, -1]);
}

function parseInputs(filePath: string): Inputs {
	const lines = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(s => s.split(""));
	return {
		start: getCoordinateOfString(lines, "S"),
		end: getCoordinateOfString(lines, "E"),
		heights: lines.map(line => {
			return line.map(h => {
				if (h === "S") {
					return 0;
				} else if (h === "E") {
					return 25;
				}
				return alphabetCode(h) - 1;
			});
		})
	}
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
