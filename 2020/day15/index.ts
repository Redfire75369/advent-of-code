import {samples, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	const mem = {};
	let prevVal;
	for (let i = 0; i < inputs.length; i++) {
		mem[inputs[i]] = [i + 1];
		prevVal = inputs[i];
	}

	for (let i = inputs.length; i < 2020; i++) {
		let val;
		if (mem[prevVal].length >= 2) {
			val = mem[prevVal][mem[prevVal].length - 1] - mem[prevVal][mem[prevVal].length - 2];
		} else if (mem[prevVal].length === 1) {
			val = i - mem[prevVal][mem[prevVal].length - 1];
		}
		if (mem[val] !== undefined) {
			mem[val].push(i + 1);
		} else {
			mem[val] = [i + 1];
		}
		prevVal = val;
	}

	return prevVal;
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const mem = new Map();
	let next;

	for (let i = 1; i < 30000000; i++) {
		const curr = (i <= inputs.length) ? inputs[i - 1] : next;
		next = mem.has(curr) ? i - mem.get(curr) : 0;
		mem.set(curr, i);
	}

	return next;
}

console.log("Part 2: " + part2());
