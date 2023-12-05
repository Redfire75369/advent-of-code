import {sample, full} from "./inputs.ts";

const [rows, coordinateMatrix] = full;

/* Part 1 */
function part1(dx, dy) {
	let trees = 0;
	let x = 0;
	let y = 0;

	while (y < rows.length) {
		if (coordinateMatrix[y][x] === "#") {
			trees++;
		}
		x = (x + dx) % rows[0].length;
		y += dy;
	}

	return trees;
}

console.log("Part 1:" + part1(3, 1));

/* Part 2 */
function part2() {
	let result = 1;
	let slopes = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2]
	];

	for (let i = 0; i < slopes.length; i++) {
		result *= part1(slopes[i][0], slopes[i][1]);
	}

	return result;
}

console.log("Part 2:" + part2());
