import {sample, full} from "./inputs.ts";
import {int} from "../../utils/int.ts";

const inputs = full;

const offsets = [
	[-1, 0, 0],
	[1, 0, 0],
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
];

function populateCubes(): [number, Set<string>] {
	let surfaceArea = 0;
	const cubes = new Set<string>();

	inputs.forEach(([x, y, z]) => {
		cubes.add([x, y, z].join(","));
		surfaceArea += 6;

		offsets.forEach(([dx, dy, dz]) => {
			if (cubes.has([x + dx, y + dy, z + dz].join(","))) {
				surfaceArea -= 2;
			}
		});
	});

	return [surfaceArea, cubes];
}

/* Part 1 */
function part1() {
	return populateCubes()[0];
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function pathToOutside(coordinates: [number, number, number], min: [number, number, number],
							  max: [number, number, number], visited: Set<string>): [boolean, Set<string>] {
		const [x, y, z] = coordinates;

		if (visited.has(coordinates.join(","))) {
			return [false, visited];
		}
		visited.add(coordinates.join(","));

		for (const offset of offsets) {
			const [dx, dy, dz] = offset;
			if (!cubes.has([x + dx, y + dy, z + dz].join(","))) {
				if ((x + dx <= min[0] || y + dy <= min[1] || z + dz <= min[2]
					|| x + dx >= max[0] || y + dy >= max[1] || z + dz >= max[2])) {
					visited.add([x + dx, y + dy, z + dz].join(","));
					return [true, visited];
				}

				const [outer, path] = pathToOutside([x + dx, y + dy, z + dz], min, max, visited);
				if (outer) {
					return [true, path];
				}
			}
		}
		return [false, visited];
	}

	let [surfaceArea, cubes] = populateCubes();

	const firstCube = cubes.values().next().value;
	const min = firstCube.split(",").map(int());
	const max = firstCube.split(",").map(int());

	const inner = new Set<string>();

	[...cubes].forEach(cube => {
		const [x, y, z] = cube.split(",").map(int());
		min[0] = Math.min(min[0], x);
		min[1] = Math.min(min[1], y);
		min[2] = Math.min(min[2], z);

		max[0] = Math.max(max[0], x);
		max[1] = Math.max(max[1], y);
		max[2] = Math.max(max[2], z);
	});

	for (let x = min[0] + 1; x < max[0]; x++) {
		for (let y = min[1] + 1; y < max[1]; y++) {
			for (let z = min[2] + 1; z < max[2]; z++) {
				if (!cubes.has([x, y, z].join(",")) && !inner.has([x, y, z].join(","))) {
					const [outer, path] = pathToOutside([x, y, z], min, max, new Set());
					if (!outer) {
						for (const tile of path) {
							inner.add(tile);
							const [x, y, z] = tile.split(",").map(int());
							offsets.forEach(([dx, dy, dz]) => {
								if (cubes.has([x + dx, y + dy, z + dz].join(","))) {
									surfaceArea--;
								}
							});
						}
					}
				}
			}
		}
	}

	return surfaceArea;
}

console.log("Part 2:", part2());
