import {sample, full} from "./inputs";

const [grid, folds] = full;

function foldGrid(grid: string[][], axis, value) {
	if (axis === "x") {
		const left = grid.map(r => r.slice(0, value).reverse());
		const right = grid.map(r => r.slice(value + 1,  grid[0].length));

		left.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (right[y][x] === "#") {
					left[y][x] = "#";
				}
			});
		});
		return left.map(r => r.reverse());
	} else {
		const topRows = grid.slice(0, value).reverse();
		const bottomRows = grid.slice(value + 1, grid.length);

		topRows.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (bottomRows[y] !== undefined) {
					if (bottomRows[y][x] === "#") {
						topRows[y][x] = "#";
					}
				}
			});
		});
		return topRows.reverse();
	}
}

/* Part 1 */
function part1() {
	const g = [...grid].map(x => [...x]);
	return foldGrid(g, ...folds[0]).reduce((acc, r) => acc + r.reduce((acc, c) => acc + (c === "#" ? 1 : 0), 0), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let g = [...grid].map(x => [...x]);
	folds.forEach(fold => {
		g = foldGrid(g, ...fold);
	});
	return g.map(r => r.join("")).join("\n");
}

console.log("Part 2: \n" + part2());
