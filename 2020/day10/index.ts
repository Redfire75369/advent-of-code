import {sample, full} from "./inputs.ts";

const inputs = full;

/* Part 1 */
function part1() {
	let jolts = 0;
	const adapters = [];
	let oneV = 0;
	let threeV = 0;

	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i] <= jolts + 3) {
			if (inputs[i] === jolts + 1) {
				oneV++;
			} else if (inputs[i] === jolts + 3) {
				threeV++;
			}
			adapters.push(inputs[i]);
			jolts = inputs[i];
		}
	}

	if (adapters.length === inputs.length) {
		return oneV * threeV;
	}
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const routes = {};
	routes[inputs[inputs.length - 1]] = 1;

	for (let i = inputs.length - 2; i >= 0; i--) {
		routes[inputs[i]] = 0;

		for (let j = i + 1; j < inputs.length && j <= i + 3; j++) {
			if (inputs[j] <= inputs[i] + 3) {
				routes[inputs[i]] += routes[inputs[j]];
			}
		}
	}

	return routes[0];
}
console.log("Part 2:", part2());
