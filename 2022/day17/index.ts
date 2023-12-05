import {sample, full} from "./inputs.ts";

const inputs = full;

const blocks = [
	[[1, 1, 1, 1]],
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 1, 0],
	],
	[
		[1, 1, 1],
		[0, 0, 1],
		[0, 0, 1],
	],
	[
		[1], [1], [1], [1]
	],
	[
		[1, 1],
		[1, 1],
	],
];

function everyBlock(coordinate: [number, number], block: number[][], callback: (coordinate: [number, number]) => boolean): boolean {
	return block.every((row, dy) => {
		return row.every((tile, dx) => {
			return tile !== 1 || callback([coordinate[0] + dx, coordinate[1] + dy]);
		});
	});
}

/* Part 1 */
function part1() {
	function testCollision(coordinate: [number, number]): boolean {
		return !map.has(coordinate.join(",")) && 0 <= coordinate[0] && coordinate[0] < 7 && 0 <= coordinate[1];
	}

	let height = 0;
	let map = new Set<string>();
	let wind = 0;

	for (let i = 0; i < 2022; i++) {
		const block = blocks[i % blocks.length];
		let coordinate: [number, number] = [2, height + 3];

		while (true) {
			if (inputs[wind % inputs.length] === "<") {
				if (everyBlock([coordinate[0] - 1, coordinate[1]], block, testCollision)) {
					coordinate[0]--;
				}
			} else {
				if (everyBlock([coordinate[0] + 1, coordinate[1]], block, testCollision)) {
					coordinate[0]++;
				}
			}

			const test = everyBlock([coordinate[0], coordinate[1] - 1], block, testCollision);
			wind++;
			if (test) {
				coordinate[1]--;
			} else {
				break;
			}
		}

		block.forEach((row, dy) => {
			row.forEach((tile, dx) => {
				if (tile === 1) {
					map.add([coordinate[0] + dx, coordinate[1] + dy].join(","));
					height = Math.max(height, coordinate[1] + dy + 1);
				}
			});
		});
	}

	return height;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function testCollision(coordinate: [number, number]): boolean {
		return !map.has(coordinate.join(",")) && 0 <= coordinate[0] && coordinate[0] < 7 && 0 <= coordinate[1];
	}

	let index = 0;
	let wind = 0;

	let height = 0;
	let floor = 0;
	let map = new Set<string>();

	const cache = new Map<string, [number, number]>();
	const heightMap = new Map<number, number>();

	let startIndex = 0;
	let startHeight = 0;

	let blocksPerCycle = 0;
	let heightsPerCycle = 0;

	let foundCycle = false;

	while (true) {
		const block = blocks[index % blocks.length];
		let coordinate: [number, number] = [2, height + 3];

		while (true) {
			if (inputs[wind % inputs.length] === "<") {
				if (everyBlock([coordinate[0] - 1, coordinate[1]], block, testCollision)) {
					coordinate[0]--;
				}
			} else {
				if (everyBlock([coordinate[0] + 1, coordinate[1]], block, testCollision)) {
					coordinate[0]++;
				}
			}

			const test = everyBlock([coordinate[0], coordinate[1] - 1], block, testCollision);
			wind++;
			if (test) {
				coordinate[1]--;
			} else {
				break;
			}
		}

		block.forEach((row, dy) => {
			row.forEach((tile, dx) => {
				const x = coordinate[0] + dx;
				const y = coordinate[1] + dy;
				if (tile === 1) {
					map.add([x, y].join(","));
					height = Math.max(height, y + 1);
				}
				if (y + 1 === height) {
					floor = floor | (1 << x);
				}
			});
		});

		const key = [index % blocks.length, wind % inputs.length, floor].join(",");
		if (cache.has(key)) {
			if ((index - startIndex) % blocksPerCycle === 0) {
				if (height - startHeight !== heightsPerCycle * 2) {
					foundCycle = false;
					blocksPerCycle = 0;
				} else {
					break;
				}
			} else if (!foundCycle) {
				const [oldIndex, oldHeight] = cache.get(key);
				startIndex = oldIndex;
				startHeight = oldHeight;

				blocksPerCycle = index - oldIndex;
				heightsPerCycle = height - oldHeight;

				foundCycle = true;
			}
		}

		cache.set(key, [index, height]);
		if (blocksPerCycle !== 0) {
			heightMap.set((index - startIndex) % blocksPerCycle, (height - startHeight) % heightsPerCycle);
		}

		index++;
	}


	const cycles = Math.floor((1e12 - 1 - startIndex) / blocksPerCycle);
	const heightFromCycles = heightsPerCycle * cycles;
	const heightFromPartialCycle = heightMap.get((1e12 - 1 - startIndex) % blocksPerCycle);

	return startHeight + heightFromCycles + heightFromPartialCycle;
}

console.log("Part 2:", part2());
