import {readFileSync} from "fs";
import {join} from "path";
import {Tile} from "./tile";


type Inputs = Tile[];

function parseInputs(filePath): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n")
		.map(tile => {
			const index = parseInt(tile.substring(5, 9));
			const pixels = tile.split("\n").slice(1).map(row => row.split("").map(pixel => pixel === "#"));
			return new Tile(index, pixels);
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
