import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

interface Input {
	flowRate: number,
	tunnels: string[]
}

type Inputs = { [key: string]: Input };

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const inputs: Inputs = {};
	readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n")
		.map(line => {
			const valve = line.substring(line.indexOf("Valve ") + 6, line.indexOf("Valve ") + 8);
			const flowRate = parseInt(line.substring(line.indexOf("flow rate=") + 10, line.indexOf(";")));
			const cut = line.replace("to valves", "to valve");
			const tunnels = cut.substring(cut.indexOf("to valve ") + 9, cut.length).split(", ");
			inputs[valve] = { flowRate, tunnels };
		});
	return inputs;
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
