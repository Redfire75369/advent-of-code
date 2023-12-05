import {sample, full} from "./inputs.ts";

const inputs = full;

const distances = findDistances();
const nonzero = [...distances.keys()].filter(d => d !== "AA");

function findDistances() {
	const distances = new Map<string, Map<string, number>>();
	for (const key in inputs) {
		if (inputs[key].flowRate > 0 || key === "AA") {
			const queue = [key];
			const dist = new Map<string, number>([[key, 0]]);
			const visited = new Set<string>([key]);

			while (queue.length > 0) {
				const key = queue.shift();
				const distance = dist.get(key);

				for (const tunnel of inputs[key].tunnels) {
					if (!visited.has(tunnel)) {
						visited.add(tunnel);
						dist.set(tunnel, distance + 1);
						queue.push(tunnel);
					}
				}
			}

			for (const key of dist.keys()) {
				if (inputs[key].flowRate === 0 && key !== "AA") {
					dist.delete(key);
				}
			}

			dist.delete(key);
			distances.set(key, dist);
		}
	}
	return distances;
}

/* Part 1 */
function part1() {
	function findMaxPressure(valve: string, open: string[], depth: number = 0): number {
		if (depth >= 30) {
			return 0;
		}
		const pressure = nonzero.filter(v => !open.includes(v) && v !== valve)
			.map(nz => findMaxPressure(nz, [...open, valve], depth + (valve === "A" ? 0 : 1) + distances.get(valve)?.get(nz) ?? 0))
			.reduce((a, p) => a > p ? a : p, 0);
		return inputs[valve].flowRate * (30 - depth) + pressure;
	}

	return findMaxPressure("AA", []);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function depthWisePath(valve: string, open: string[], depth: number = 0): [number, string[]][] {
		if (depth >= 26) {
			return [[0, open]];
		}
		const pressure = inputs[valve].flowRate * (25 - depth);
		return [
			...nonzero.filter(nz => !open.includes(nz) && nz !== valve)
				.flatMap(nz => depthWisePath(nz, [...open, valve], depth + (valve === "AA" ? 0 : 1) + distances.get(valve).get(nz))
					.map<[number, string[]]>(([p, open]) => [pressure + p, open])),
			[pressure, [...open, valve]],
		];
	}

	const paths = depthWisePath("AA", []);

	const keys = {};
	nonzero.forEach((k, i) => {
		keys[k] = i;
	});

	const filtered: [number, number][] = paths.map(([pressure, path]) => {
		return [pressure, path.reduce((acc, cur) => acc | (keys[cur] !== undefined ? (1 << keys[cur]) : 0), 0)];
	});
	filtered.sort((a, b) => b[0] - a[0]);

	let max = 0;
	for (let i = 0; i < filtered.length; i++) {
		if (max - filtered[i][0] > filtered[0][0]) {
			break;
		}
		for (let j = 0; j < i; j++) {
			if ((filtered[i][1] & filtered[j][1]) === 0) {
				max = Math.max(max, filtered[i][0] + filtered[j][0]);
			}
		}
	}
	return max;
}

console.log("Part 2:", part2());
