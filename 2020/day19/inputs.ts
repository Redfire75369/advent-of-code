import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): [{[id: string]: string | string[][]}, string[]] {
	const sections = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	const rules = {};
	sections[0].split("\n").forEach(line => {
		const split = line.split(": ");
		const id = split[0];
		let rule;
		if (split[1].includes("\"")) {
			rule = split[1].substring(1, split[1].lastIndexOf("\""));
		} else {
			rule = split[1].split(" | ").map(r => r.split(" "));
		}
		rules[id] = rule;
	});

	return [rules, sections[1].split("\n")];
}

const samples = [1, 2].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
