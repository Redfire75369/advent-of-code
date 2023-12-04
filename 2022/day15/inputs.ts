import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

interface Input {
	sensor: [number, number],
	beacon: [number, number]
}

type Inputs = Input[];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	return readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const commaIndex = line.indexOf(",");
			const colonIndex = line.indexOf(":");

			const sensorX = parseInt(line.substring(line.indexOf("x=") + 2, commaIndex));
			const sensorY = parseInt(line.substring(line.indexOf("y=") + 2, colonIndex));

			const beaconX = parseInt(line.substring(line.indexOf("x=", commaIndex) + 2, line.indexOf(",", commaIndex + 1)));
			const beaconY = parseInt(line.substring(line.indexOf("y=", colonIndex) + 2, line.length));

			return {
				sensor: [sensorX, sensorY],
				beacon: [beaconX, beaconY],
			}
		});
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
