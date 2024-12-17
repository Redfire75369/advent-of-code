import {readFileSync} from "fs";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {int} from "../../utils/int.ts";

type Inputs = [[bigint, bigint, bigint], number[]];

const __dirname = dirname(fileURLToPath(import.meta.url));
function parseInputs(filePath: string): Inputs {
	const [registers, program] = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n");
	const [regA, regB, regC] = registers.split("\n").map(line => BigInt(line.slice(12)));
	return [
		[regA, regB, regC],
		program.slice(9).split(",").map(int()),
	]
}

const samples = [1, 2].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
