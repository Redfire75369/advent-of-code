import {sample, full} from "./inputs.ts";

const inputs = full;

const maxX = Math.max(...inputs.map(x => [parseInt(x[0][0]), parseInt(x[1][0])]).flat());
const maxY = Math.max(...inputs.map(x => [parseInt(x[0][1]), parseInt(x[1][1])]).flat());

function range(start, stop) {
	const [check, change] = (start <= stop)
		? [i => i <= stop, n => n + 1]
		: [i => i >= stop, n => n - 1];

	const array = [];
	for (let i = start; check(i); i = change(i)) {
		array.push(i);
	}
	return array;
}

/* Part 1 */
function part1() {
	const grid = new Array(maxY + 1).fill(new Array(maxX + 1).fill(0));
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		const [[x1, y1], [x2, y2]] = input.map(x => x.map(x => parseInt(x)));
		if (x1 === x2 || y1 === y2) {
			if (x1 === x2) {
				range(y1, y2).forEach(y => grid[y][x1] += 1);
			} else {
				range(x1, x2).forEach(x => grid[y1][x] += 1);
			}
		}
	}

	return grid.reduce((acc, row) => acc + row.filter(s => s >= 2).length, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const grid = new Array(maxY + 1).fill(new Array(maxX + 1).fill(0));
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		const [[x1, y1], [x2, y2]] = input.map(x => x.map(x => parseInt(x)));

		if (x1 === x2 || y1 === y2) {
			if (x1 === x2) {
				range(y1, y2).forEach(y => grid[y][x1] += 1);
			} else {
				range(x1, x2).forEach(x => grid[y1][x] += 1);
			}
		} else {
			const xRange = range(x1, x2);
			const yRange = range(y1, y2);

			for (let i = 0; i < xRange.length; i++) {
				const x = xRange[i];
				const y = yRange[i];
				grid[y][x] += 1;
			}
		}
	}

	return grid.reduce((acc, row) => acc + row.filter(s => s >= 2).length, 0);
}

console.log("Part 2:", part2());
