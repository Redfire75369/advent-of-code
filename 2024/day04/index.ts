import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

function checkGrid(x: number, y: number, predicate: string): boolean {
	return 0 <= x && x < inputs.length && 0 <= y && y < inputs.length
		&& inputs[y][x] === predicate;
}

/* Part 1 */
function part1() {
	const predicate = "XMAS".split("");
	return inputs.reduce(sum((row, y) => {
		return row.reduce(sum((cell, x) => {
			let count = 0;
			if (cell === predicate[0]) {
				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						let valid = true;
						for (let i = 1; i < predicate.length; i++) {
							valid &&= checkGrid(x + dx * i, y + dy * i, predicate[i]);
						}
						if (valid) {
							count++;
						}
					}
				}
			}
			return count;
		}), 0);
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return inputs.reduce(sum((row, y) => {
		return row.reduce(sum((cell, x) => {
			if (cell === "A") {
				let cross = 0;
				for (let dx = -1; dx <= 1; dx += 2) {
					for (let dy = -1; dy <= 1; dy += 2) {
						if (checkGrid(x + dx, y + dy, "M") && checkGrid(x - dx, y - dy, "S")) {
							cross += 1;
						}
					}
				}
				if (cross === 2) {
					return 1;
				}
			}
			return 0;
		}), 0);
	}), 0);
}

console.log("Part 2:", part2());
