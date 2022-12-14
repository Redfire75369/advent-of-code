import {sample, full} from "./inputs";

const inputs = full;

function drawRocks(map: Map<string, undefined>): number {
	let lowest = 0;
	inputs.forEach(input => {
		for (let i = 0; i < input.length - 1; i++) {
			const [x1, y1] = input[i];
			const [x2, y2] = input[i + 1];

			lowest = Math.max(lowest, y1, y2);

			if (x1 === x2) {
				const largeY = Math.max(y1, y2);
				const smallY = Math.min(y1, y2);

				for (let y = smallY; y <= largeY; y++) {
					map.set([x1, y].join(","), undefined);
				}
			} else {
				const largeX = Math.max(x1, x2);
				const smallX = Math.min(x1, x2);

				for (let x = smallX; x <= largeX; x++) {
					map.set([x, y1].join(","), undefined);
				}
			}
		}
	});
	return lowest;
}

function simulateSand(map: Map<string, undefined>, position: [number, number]) {
	if (!map.has([position[0], position[1] + 1].join(","))) {
		position[1]++;
	} else if (!map.has([position[0] - 1, position[1] + 1].join(","))) {
		position[0]--;
		position[1]++;
	} else if (!map.has([position[0] + 1, position[1] + 1].join(","))) {
		position[0]++;
		position[1]++;
	} else {
		map.set(position.join(","), undefined);
	}
}

/* Part 1 */
function part1() {
	const map = new Map<string, undefined>();

	const lowest = drawRocks(map);
	const rocks = map.size;

	while (true) {
		let position: [number, number] = [500, 0];
		let toBreak = false;
		while (!map.has(position.join(","))) {
			if (position[1] > lowest) {
				toBreak = true;
				break;
			} else {
				simulateSand(map, position);
			}
		}

		if (toBreak) {
			break;
		}
	}

	return map.size - rocks;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const map = new Map<string, undefined>();

	const lowest = drawRocks(map);
	const floor = lowest + 2;
	for (let x = 500 - floor; x <= 500 + floor; x++) {
		map.set([x, floor].join(","), undefined);
	}

	const rocks = map.size;

	while (true) {
		let position: [number, number] = [500, 0];
		if (map.has(position.join(","))) {
			break;
		}
		while (!map.has(position.join(","))) {
			simulateSand(map, position);
		}
	}

	return map.size - rocks;
}

console.log("Part 2:", part2());
