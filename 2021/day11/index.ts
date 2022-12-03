import {sample, full} from "./inputs";

const inputs = full;

function flashNeighbours(flashes, octopi, x, y) {
	const [minX, maxX] = [Math.max(0, x - 1), Math.min(x + 1, octopi[0].length - 1)];
	const [minY, maxY] = [Math.max(0, y - 1), Math.min(y + 1, octopi.length - 1)];

	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			if (octopi[y][x] < 10) {
				octopi[y][x]++;
				if (octopi[y][x] > 9) {
					flashNeighbours(flashes, octopi, x, y);
				}
			}
		}
	}
}

/* Part 1 */
function part1() {
	let flashes = 0;
	const octopi = [...inputs].map(x => [...x]);
	for (let i = 0; i < 100; i++) {
		octopi.forEach((row, y) => {
			row.forEach((octopus, x) => {

				if (octopus < 10) {
					octopi[y][x]++;
					if (octopi[y][x] > 9) {
						flashNeighbours(flashes, octopi, x, y);
					}
				}
			});
		});

		octopi.forEach((row, y) => {
			row.forEach((octopus, x) => {
				if (octopus > 9) {
					flashes++;
					octopi[y][x] = 0;
				}
			});
		});
	}

	return flashes;
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let allFlashed = 0;
	const octopi = [...inputs].map(x => [...x]);
	let step = 1;

	while (allFlashed === 0) {
		let flashes = 0;
		octopi.forEach((row, y) => {
			row.forEach((octopus, x) => {
				if (octopus < 10) {
					octopi[y][x]++;
					if (octopi[y][x] > 9) {
						flashNeighbours(flashes, octopi, x, y);
					}
				}
			});
		});

		octopi.forEach((row, y) => {
			row.forEach((octopus, x) => {
				if (octopus > 9) {
					flashes++;
					octopi[y][x] = 0;
				}
			});
		});

		if (flashes === 100) {
			allFlashed = step;
		}
		step++;
	}

	return allFlashed;
}

console.log("Part 2: " + part2());
