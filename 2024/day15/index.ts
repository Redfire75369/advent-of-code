import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";
import {int} from "../../utils/int.ts";

const [grid, robot, instructions] = full;

function instructionToDelta(instruction: string): [number, number] {
	if (instruction === "^") {
		return [0, -1];
	} else if (instruction === "v") {
		return [0, 1];
	} else if (instruction === "<") {
		return [-1, 0];
	} else if (instruction === ">") {
		return [1, 0];
	}
	return [0, 0];
}

/* Part 1 */
function part1() {
	function move(map: string[][], x: number, y: number, dx: number, dy: number): boolean {
		const item = map[y][x];
		if (item === ".") {
			return true;
		}
		if (item === "#") {
			return false;
		}

		const x1 = x + dx;
		const y1 = y + dy;

		if (move(map, x1, y1, dx, dy)) {
			map[y1][x1] = item;
			map[y][x] = ".";
			return true;
		}
		return false;
	}

	const map = structuredClone(grid);

	let [x, y] = robot;
	for (const instruction of instructions) {
		const [dx, dy] = instructionToDelta(instruction);
		if (move(map, x, y, dx, dy)) {
			x += dy;
			y += dx;
		}
	}

	return map.reduce(sum((r, y) => {
		return r.reduce(sum((c, x) => {
			return c === "O" ? 100 * y + x : 0;
		}), 0);
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function move(map: string[][], moves: Set<string>, x: number, y: number, dx: number, dy: number): boolean {
		const item = map[y][x];
		if (item === ".") {
			return true;
		}

		if (item === "#") {
			return false;
		}

		const x1 = x + dx;
		const y1 = y + dy;

		if (item === "[" && dy !== 0) {
			if (move(map, moves, x1, y1, dx, dy) && move(map, moves, x1 + 1, y1, dx, dy)) {
				moves.add(["[", x, y, x1, y1].join(","));
				moves.add(["]", x + 1, y, x1 + 1, y1].join(","));
				return true;
			}
		} else if (item === "]" && y !== y1) {
			if (move(map, moves, x1, y1, dx, dy) && move(map, moves, x1 - 1, y1, dx, dy)) {
				moves.add(["]", x, y, x1, y1].join(","));
				moves.add(["[", x - 1, y, x1 - 1, y1].join(","));
				return true;
			}
		} else {
			if (move(map, moves, x1, y1, dx, dy)) {
				moves.add([item, x, y, x1, y1].join(","));
				return true;
			}
		}
		return false;
	}

	let map = grid.map(row => {
		return row.flatMap(c => {
			if (c === "#") {
				return ["#", "#"];
			} else if (c === "O") {
				return ["[", "]"];
			} else if (c === "@") {
				return ["@", "."];
			}
			return [".", "."];
		})
	});

	let x = robot[0] * 2;
	let y = robot[1];
	for (const instruction of instructions) {
		const [dx, dy] = instructionToDelta(instruction);
		const moves = new Set<string>();
		if (move(map, moves, x, y, dx, dy)) {
			x += dx;
			y += dy;

			for (const move of moves) {
				const [item, ...pos] = move.split(",");
				const [x, y, x1, y1] = pos.map(int());
				map[y][x] = ".";
				map[y1][x1] = item;
			}
		}

	}

	return map.reduce(sum((r, y) => {
		return r.reduce(sum((c, x) => {
			return c === "[" ? 100 * y + x : 0;
		}), 0);
	}), 0);
}

console.log("Part 2:", part2());
