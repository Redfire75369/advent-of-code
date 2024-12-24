import {sample, full} from "./inputs.ts";

const [start, instructions] = full;

function simulate(instructions: Record<string, [string, string, string]>): Record<string, boolean> {
	const wires = structuredClone(start);

	const queue = Object.keys(instructions);
	while (queue.length > 0) {
		const key = queue.shift();
		const [a, b, i] = instructions[key];
		if (wires[a] === undefined || wires[b] === undefined) {
			queue.push(key);
			continue;
		}

		if (i === "AND") {
			wires[key] = wires[a] && wires[b];
		} else if (i === "OR") {
			wires[key] = wires[a] || wires[b];
		} else if (i === "XOR") {
			wires[key] = wires[a] !== wires[b];
		}
	}

	return wires;
}

function pad(key: string, index: number) {
	return `${key}${index.toString().padStart(2, "0")}`;
}

const bits = 1 + Math.max(...Object.keys(start).map(x => parseInt(x.slice(1))));

/* Part 1 */
function part1() {
	const wires = simulate(instructions);

	let output = "";
	for (let i = bits; i >= 0; i--) {
		const wire = wires[pad("z", i)];
		output += Number(wire).toString();
	}
	return parseInt(output, 2);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function find(operator: string, a: string, b: string): string | null {
		for (const k in instructions) {
			const op = instructions[k];
			if (operator === op[2] && (a === op[0] && b === op[1] || a === op[1] && b === op[0])) {
				return k;
			}
		}
		return null;
	}

	const swapped = [];

	let carry: string | null = null;
	for (let i = 0; i < bits; i++) {
		let xor = find("XOR", pad("x", i), pad("y", i));
		let and = find("AND", pad("x", i), pad("y", i));

		let carryAnd: string | null = null;
		let sum: string | null = null;
		let nextCarry: string | null = null;

		if (carry !== null) {
			carryAnd = find("AND", carry, xor);

			if (carryAnd === null) {
				[xor, and] = [and, xor];
				swapped.push(xor, and);
				carryAnd = find("AND", carry, xor);
			}

			sum = find("XOR", carry, xor);

			if (xor?.startsWith("z")) {
				[xor, sum] = [sum, xor];
				swapped.push(xor, sum);
			}
			if (and?.startsWith("z")) {
				[and, sum] = [sum, and];
				swapped.push(and, sum);
			}
			if (carryAnd?.startsWith("z")) {
				[carryAnd, sum] = [sum, carryAnd];
				swapped.push(carryAnd, sum);
			}

			nextCarry = find("OR", carryAnd, and);

			if (nextCarry === pad("z", i)) {
				[sum, nextCarry] = [nextCarry, sum];
				swapped.push(sum, nextCarry);
			}
		}

		carry = nextCarry ?? and;
	}

	return swapped.sort().join(",");
}

console.log("Part 2:", part2());
