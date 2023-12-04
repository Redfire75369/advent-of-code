import {sample, full, Pair, Value} from "./inputs";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

enum State {
	Failure,
	Continue,
	Success
}

function testPair(pair: Pair): State {
	if (typeof pair[0] === "number" && typeof pair[1] === "number") {
		if (pair[0] < pair[1]) {
			return State.Success;
		} else if (pair[1] < pair[0]) {
			return State.Failure;
		} else {
			return State.Continue;
		}
	} else if (typeof pair[0] === "number") {
		return testPair([[pair[0]], pair[1]]);
	} else if (typeof pair[1] === "number") {
		return testPair([pair[0], [pair[1]]]);
	}


	for (let i = 0; i < pair[1].length; i++) {
		if (i > pair[0].length - 1) {
			return State.Success;
		}

		const result = testPair([pair[0][i], pair[1][i]]);
		if (result === State.Failure || result === State.Success) {
			return result;
		}
	}
	if (pair[0].length > pair[1].length) {
		return State.Failure;
	} else {
		return State.Continue;
	}
}

/* Part 1 */
function part1() {
	const indexes = [];
	for (let i = 0; i < inputs.length - 1; i++) {
		if (testPair(inputs[i]) === State.Success) {
			indexes.push(i + 1);
		}
	}
	return indexes.reduce(sum(), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const singles: Value[] = inputs.flatMap(p => p);
	singles.push([[2]], [[6]]);
	const indexes = [];
	singles.sort((a, b) => {
		const result = testPair([a, b]);
		switch (result) {
			case State.Failure:
				return 1;
			case State.Continue:
				return 0;
			case State.Success:
				return -1;
		}
	});
	const firstDivider = singles.findIndex(s => typeof s !== "number" && s.length === 1 && typeof s[0] !== "number" && s[0].length === 1 && s[0][0] === 2) + 1;
	const secondDivider = singles.findIndex(s => typeof s !== "number" && s.length === 1 && typeof s[0] !== "number" && s[0].length === 1 && s[0][0] === 6) + 1;
	return firstDivider * secondDivider;
}

console.log("Part 2:", part2());
