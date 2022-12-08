import {sample, full} from "./inputs";
import {product} from "../../utils/reducer";

const inputs = full;

/* Part 1 */
function part1() {
	let visible = 0;
	for (let y = 0; y < inputs.length; y++) {
		if (y === 0 || y === inputs.length - 1) {
			visible += inputs[0].length;
			continue;
		}
		for (let x = 0; x < inputs[0].length; x++) {
			if (x === 0 || x === inputs[0].length - 1) {
				visible++;
				continue;
			}
			const height = inputs[y][x];

			let isVisible = false;
			for (let dx = x - 1; dx >= 0; dx--) {
				if (inputs[y][dx] >= height) {
					break;
				}
				if (dx === 0) {
					isVisible = true;
				}
			}

			for (let dx = x + 1; dx < inputs[0].length; dx++) {
				if (inputs[y][dx] >= height) {
					break;
				}
				if (dx === inputs[0].length - 1) {
					isVisible = true;
				}
			}

			for (let dy = y - 1; dy >= 0; dy--) {
				if (inputs[dy][x] >= height) {
					break;
				}
				if (dy === 0) {
					isVisible = true;
				}
			}

			for (let dy = y + 1; dy < inputs[0].length; dy++) {
				if (inputs[dy][x] >= height) {
					break;
				}
				if (dy === inputs[0].length - 1) {
					isVisible = true;
				}
			}

			if (isVisible) {
				visible++;
			}
		}
	}
	return visible;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const scores = inputs.flatMap((row, y) => {
		if (y === 0 || y === inputs.length - 1) {
			return [0];
		} else {
			return row.map((height, x) => {
				if (x === 0 || x === inputs.length - 1) {
					return 0;
				}

				const visible = [];
				for (let dx = x - 1; dx >= 0; dx--) {
					if (inputs[y][dx] >= height) {
						visible[0] = x - dx;
						break;
					}
					if (dx === 0) {
						visible[0] = x - dx;
					}
				}
				for (let dx = x + 1; dx < inputs[0].length; dx++) {
					if (inputs[y][dx] >= height) {
						visible[1] = dx - x;
						break;
					}
					if (dx === inputs[0].length - 1) {
						visible[1] = dx - x;
					}
				}
				for (let dy = y - 1; dy >= 0; dy--) {
					if (inputs[dy][x] >= height) {
						visible[2] = y - dy;
						break;
					}
					if (dy === 0) {
						visible[2] = y - dy;
					}
				}
				for (let dy = y + 1; dy < inputs[0].length; dy++) {
					if (inputs[dy][x] >= height) {
						visible[3] = dy - y;
						break;
					}
					if (dy === inputs[0].length - 1) {
						visible[3] = dy - y;
					}
				}
				return visible.reduce(product(), 1);
			});
		}
	});
	return Math.max(...scores);
}

console.log("Part 2:", part2());
