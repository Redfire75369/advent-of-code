import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

type Inputs = [number[], Record<string, [string, string]>];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [directions, nodes] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	const mappings: Record<string, [string, string]> = Object.fromEntries(nodes.split("\n").map(node => {
		const [id, connections] = node.substring(0, node.length - 1).split(" = (");
		const [left, right] = connections.split(", ");
		return [id, [left, right]];
	}));
	return [directions.split("").map(d => d === "R" ? 1 : 0), mappings];
}

const samples = [1, 2, 3].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
