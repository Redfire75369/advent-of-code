import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.ts";

type Range = {
	destination: number,
	source: number,
	length: number,
};

export type Map = {
	source: string,
	destination: string,
	ranges: Range[],
};

type Inputs = {
	seeds: number[],
	maps: Map[],
};

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [seedSection, ...mapSections] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	const seeds = seedSection.split(": ")[1].split(" ").map(int());
	const maps = mapSections.map<Map>(section => {
		const [head, ...body] = section.split("\n");
		const [source, _, destination] = head.split(" ")[0].split("-");
		const ranges: Range[] = body.map(range => {
			const [destination, source, length] = range.split(" ").map(int());
			return {destination, source, length};
		});
        ranges.sort((a, b) => a.source - b.source);
		return {source, destination, ranges};
	});
	return {seeds, maps}
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
