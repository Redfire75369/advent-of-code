import {readFileSync} from "fs";
import {join} from "path";

function parseInputs(filePath): [string[][], [number[], number[]][], number[], number[][]] {
	const inputs = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).trim().split("\n\n").map(x => x.split("\n"));
	const validators: [number[], number[]][] = inputs[0].map(input => {
		let validator = input.split(": ")[1].split(" or ");
		return [validator[0].split("-").map(x => parseInt(x)), validator[1].split("-").map(x => parseInt(x))];
	});

	const myTicket = inputs[1][1].split(",").map(x => parseInt(x));
	const tickets = inputs[2].slice(1).map(ticket => ticket.split(",").map(v => parseInt(v)));
	return [inputs, validators, myTicket, tickets];
}

const samples = [1, 2].map(x => parseInputs(`./sample${x}.txt`));
const full = parseInputs("./full.txt");

export {
	samples,
	full,
};
