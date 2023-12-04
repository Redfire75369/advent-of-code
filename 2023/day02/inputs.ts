import {readFileSync} from "fs";
import {join} from "path";

type Inputs = [number, [number, number, number][]][];

function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const [game, sets] = line.split(": ");
			const id = parseInt(game.split(" ")[1]);
			const cubeSets = sets.split("; ").map(set => {
				const cubes: [number, number, number] = [0, 0, 0];
				set.split(", ").forEach(cube => {
					const [number, colour] = cube.split(" ");
					if (colour === "red") {
						cubes[0] += parseInt(number);
					} else if (colour === "green") {
						cubes[1] += parseInt(number);
					} else {
						cubes[2] += parseInt(number);
					}
				});
				return cubes;
			});
			return [id, cubeSets];
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
