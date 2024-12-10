import {sample, full} from "./inputs.ts";
import {int} from "../../utils/int.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

/* Part 1 */
function part1() {
	function check(position: [number, number], h: number, newPositions: Set<string>) {
		const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		for (let direction of directions) {
			const x = position[0] + direction[0];
			const y = position[1] + direction[1];
			if (0 <= x && x < inputs[0].length && 0 <= y && y < inputs.length) {
				if (inputs[y][x] === h + 1) {
					newPositions.add([x, y].join(","));
				}
			}
		}
	}

	return inputs.reduce(sum((row, y0) => {
		return row.reduce(sum((c, x0) => {
			if (c !== 0) {
				return 0;
			}
			let positions = new Set([[x0, y0].join(",")]);
			for (let h = 0; h < 9; h++) {
				const newPositions = new Set<string>();
				for (const position of positions) {
					const [x0, y0] = position.split(",").map(int());
					check([x0, y0], h, newPositions);
				}
				positions = newPositions;
			}
			return positions.size;
		}), 0);
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function check(position: [number, number], h: number, newPositions: [number, number][]) {
		const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		for (let direction of directions) {
			const x = position[0] + direction[0];
			const y = position[1] + direction[1];
			if (0 <= x && x < inputs[0].length && 0 <= y && y < inputs.length) {
				if (inputs[y][x] === h + 1) {
					newPositions.push([x, y]);
				}
			}
		}
	}

	return inputs.reduce(sum((row, y0) => {
		return row.reduce(sum((c, x0) => {
			if (c !== 0) {
				return 0;
			}
			let positions = [[x0, y0]];
			for (let h = 0; h < 9; h++) {
				const newPositions: [number, number][] = [];
				for (const [x, y] of positions) {
					check([x, y], h, newPositions);
				}
				positions = newPositions;
			}
			return positions.length;
		}), 0);
	}), 0);
}

console.log("Part 2:", part2());
