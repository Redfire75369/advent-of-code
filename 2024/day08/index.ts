import {sample, full} from "./inputs.ts";

const [size, antennas] = full;

function checkAdd(unique: Set<string>, x: number, y: number): boolean {
	if (0 <= x && x < size[0] && 0 <= y && y < size[1]) {
		unique.add([x, y].join(","));
		return true;
	}
	return false;
}

/* Part 1 */
function part1() {
	const unique = new Set<string>();
	for (const key in antennas) {
		for (let i = 0; i < antennas[key].length; i++) {
			for (let j = 0; j < antennas[key].length; j++) {
				if (i === j) {
					continue;
				}

				const [x1, y1] = antennas[key][i];
				const [x2, y2] = antennas[key][j];
				const [x3, y3] = [x2 + x2 - x1, y2 + y2 - y1];

				checkAdd(unique, x3, y3);
			}
		}
	}
	return unique.size;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const unique = new Set<string>();
	for (const key in antennas) {
		for (let i = 0; i < antennas[key].length; i++) {
			for (let j = 0; j < antennas[key].length; j++) {
				if (i === j) {
					continue;
				}

				const [x1, y1] = antennas[key][i];
				const [x2, y2] = antennas[key][j];
				const dx = x2 - x1;
				const dy = y2 - y1;

				checkAdd(unique, x1, y1);

				let [x3, y3] = [x2, y2];
				let res = true;
				while (res) {
					[x3, y3] = [x3 + dx, y3 + dy];
					res = checkAdd(unique, x3, y3);
				}
			}
		}
	}
	return unique.size;
}

console.log("Part 2:", part2());
