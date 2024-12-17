import {samples, full} from "./inputs.ts";

const [registers, program] = full;

function runProgram(registers: [bigint, bigint, bigint]): number[] {
	let [a, b, c] = registers;
	let i = 0;
	const out = [];

	while (i < program.length) {
		const op = program[i];
		const literal = BigInt(program[i + 1]);

		let combo = -1n;
		if (literal <= 3n) {
			combo = literal;
		} else if (literal === 4n) {
			combo = a;
		} else if (literal === 5n) {
			combo = b;
		} else if (literal === 6n) {
			combo = c;
		}

		if (op === 0) {
			a = a >> combo;
		} else if (op === 1) {
			b = b ^ literal;
		} else if (op === 2) {
			b = combo & 0b111n;
		} else if (op === 3) {
			if (a !== 0n) {
				i = Number(literal);
				continue;
			}
		} else if (op === 4) {
			b = b ^ c;
		} else if (op === 5) {
			out.push(Number(combo & 0b111n));
		} else if (op === 6) {
			b = a >> combo;
		} else if (op === 7) {
			c = a >> combo;
		}
		i += 2;
	}

	return out;
}

/* Part 1 */
function part1() {
	return runProgram(registers).join(",");
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function check(depth: bigint, j: number): bigint {
		if (j < 0) return depth;
		for (let i = 0; i < 8; i++) {
			const a = (depth << 3n) + BigInt(i);
			const out = runProgram([a, registers[1], registers[2]]);
			if (out[0] === program[j]) {
				const final = check(a, j - 1);
				if (final >= 0n) {
					return final;
				}
			}
		}
		return -1n;
	}

	return check(0n, program.length - 1);
}

console.log("Part 2:", part2());
