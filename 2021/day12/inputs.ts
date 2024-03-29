import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string) {
	const links = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n").map(l => l.split("-"));
	const connections = {};
	links.forEach(([start, end]) => {
		if (connections[start] === undefined) {
			connections[start] = [];
		}
		if (connections[end] === undefined) {
			connections[end] = [];
		}
		connections[start].push(end);
		connections[end].push(start);
	});

	return connections;
}

const samples = [1, 2, 3].map(x => parseInputs(`./sample${x}.txt`));;
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
