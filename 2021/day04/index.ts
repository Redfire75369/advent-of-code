import {sample, full} from "./inputs";

const [order, grids, marked] = full;

function gridMatch(grid, marked) {
	let match = grid.some((row, j) => {
		return row.every((_square, k) => {
			return marked[j][k];
		});
	});

	if (match) {
		return true;
	}

	for (let k = 0; k < grid[0].length; k++) {
		match = grid.every((_row, j) => {
			return marked[j][k];
		});

		if (match) {
			return true;
		}
	}

	return false;
}

/* Part 1 */
function part1() {
	let match = null;
	let draw = null;
	for (let i = 0; i < order.length; i++) {
		const number = order[i];

		grids.forEach((grid, i) => {
			grid.forEach((row, j) => {
				row.forEach((square, k) => {
					if (square === number) {
						marked[i][j][k] =  true;
					}
				});
			});
		});

		grids.some((grid, i) => {
			if (gridMatch(grid, marked[i])) {
				match = i;
				return true;
			} else {
				return false;
			}
		});

		if (match !== null) {
			draw = number;
			break;
		}
	}

	const grid = grids[match];
	const sum = grid.reduce((acc, row, j) => {
		return acc + row.reduce((acc, square, k) => {
			return acc + (marked[match][j][k] ? 0 : parseInt(square));
		}, 0);
	}, 0);

	console.log(match, sum, draw);
	return sum * draw;
}

// console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let draw = null;

	let gridsLeft = grids;
	let markedLeft = marked;
	for (let i = 0; i < order.length; i++) {
		const number = order[i];

		grids.forEach((grid, i) => {
			grid.forEach((row, j) => {
				row.forEach((square, k) => {
					if (square === number) {
						marked[i][j][k] =  true;
					}
				});
			});
		});

		if (gridsLeft.length !== 1) {
			console.log(i, number);
			const tmpGridsLeft = gridsLeft.filter((grid, i) => {
				if (number === "19" && i == 38) {
					console.log(gridMatch(grid, markedLeft[i]))	;
				}
				return !gridMatch(grid, markedLeft[i]);
			});
			markedLeft = markedLeft.filter((marked, i) => {
				if (number === "19") {
					console.log(gridMatch(gridsLeft[i], marked));
					console.log(1, i);
				}
				return !gridMatch(gridsLeft[i], marked);
			});
			gridsLeft = tmpGridsLeft;
		}

		if (gridsLeft.length === 1) {
			console.log(gridsLeft, markedLeft);
			if (gridMatch(gridsLeft[0], markedLeft[0])) {
				draw = number;
				break;
			}
		}
	}

	const grid = gridsLeft[0];
	const sum = grid.reduce((acc, row, j) => {
		return acc + row.reduce((acc, square, k) => {
			return acc + (markedLeft[0][j][k] ? 0 : parseInt(square));
		}, 0);
	}, 0);

	console.log(sum, draw);
	return sum * draw;
}

console.log("Part 2: " + part2());
