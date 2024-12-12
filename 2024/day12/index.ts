import {samples, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";
import {int} from "../../utils/int.ts";

const inputs = full;

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function checkBounds(x: number, y: number): boolean {
	return 0 <= x && x < inputs[0].length && 0 <= y && y < inputs.length;
}

function fencedArea(x: number, y: number, cell: string, visited: Set<string>) {
	if (!checkBounds(x, y)) {
		return;
	}

	for (const [dx, dy] of DIRS) {
		const x1 = x + dx;
		const y1 = y + dy;
		const key = [x1, y1].join(",");
		if (checkBounds(x1, y1) && inputs[y1][x1] === cell && !visited.has(key)) {
			visited.add(key);
			fencedArea(x1, y1, cell, visited);
		}
	}
}

/* Part 1 */
function part1() {
	const handled = new Set<string>();

	return inputs.reduce(sum((row, y) => {
		return row.reduce(sum((c, x) => {
			if (handled.has([x, y].join(","))) {
				return 0;
			}

			const fenced =  new Set<string>([[x, y].join(",")]);
			fencedArea(x, y, c, fenced);

			let perimeter = 0;
			for (const cell of fenced) {
				handled.add(cell);
				const [x, y] = cell.split(",").map(int());

				for (const [dx, dy] of DIRS) {
					const x1 = x + dx;
					const y1 = y + dy;
					const key = [x1, y1].join(",");
					if (!fenced.has(key)) {
						perimeter += 1;
					}
				}
			}

			return fenced.size * perimeter;
		}), 0);
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function findSegmentsInDirection(isRow: boolean, side: boolean, fenced: Set<string>): number {
		function keyed(isRow: boolean, m: number, a: number) {
			return isRow ? [a, m].join(",") : [m, a].join(",");
		}

		let sides = [inputs.length, inputs[0].length];
		let max = isRow ? sides : sides.toReversed();
		let dm = side ? 1 : -1;

		let segments = 0;
		for (let m = 0; m < max[0]; m++) {
			let start = false;
			for (let a = 0; a < max[1]; a++) {
				let key = keyed(isRow, m, a);
				let key1 = keyed(isRow, m + dm, a);
				if (fenced.has(key) && !fenced.has(key1)) {
					if (!start) {
						start = true;
					}
				} else if (start) {
					segments += 1;
					start = false;
				}
			}
			if (start) {
				segments += 1;
			}
		}
		return segments;
	}

	const handled = new Set<string>();

	return inputs.reduce(sum((row, y) => {
		return row.reduce(sum((c, x) => {
			if (handled.has([x, y].join(","))) {
				return 0;
			}

			const fenced = new Set<string>([[x, y].join(",")]);
			fencedArea(x, y, c, fenced);

			for (const cell of fenced) {
				handled.add(cell);
			}

			const segments = findSegmentsInDirection(false, false, fenced)
				+ findSegmentsInDirection(false, true, fenced)
				+ findSegmentsInDirection(true, false, fenced)
				+ findSegmentsInDirection(true, true, fenced);
			return fenced.size * segments;
		}), 0);
	}), 0);
}

console.log("Part 2:", part2());
