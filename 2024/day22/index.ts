import {samples, full} from "./inputs.ts";

const inputs = full;

function mix(secret: bigint, value: bigint): bigint {
	return secret ^ value;
}

function prune(secret: bigint): bigint {
	return secret & 0xFFFFFFn;
}

function transform(secret: bigint): bigint {
	secret = prune(mix(secret, secret << 6n));
	secret = prune(mix(secret, secret >> 5n));
	return prune(mix(secret, secret << 11n));
}

/* Part 1 */
function part1() {
	return inputs.reduce(((acc, input) => {
		let secret = BigInt(input);
		for (let i = 0; i < 2000; i++) {
			secret = transform(secret);
		}
		return acc + secret;
	}), 0n);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const sequences = new Map<string, number>();
	for (const input of inputs) {
		let secret = BigInt(input);
		let prices = [input % 10];
		for (let i = 0; i < 2000; i++) {
			secret = transform(secret);
			prices.push(Number(secret % 10n));
		}

		const seen = new Set<string>();

		for (let i = 4; i < prices.length; i++) {
			const seq = [
				prices[i - 3] - prices[i - 4],
				prices[i - 2] - prices[i - 3],
				prices[i - 1] - prices[i - 2],
				prices[i] - prices[i - 1],
			].join(",");
			if (seen.has(seq)) {
				continue;
			}
			seen.add(seq);
			sequences.set(seq, (sequences.get(seq) ?? 0) + prices[i]);
		}
	}

	return Math.max(...sequences.values());
}

console.log("Part 2:", part2());
