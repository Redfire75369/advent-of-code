import {sample, full} from "./inputs.ts";

const [matrix3D, matrix4D] = full;

function getNeighbours(coords: number[], matrix: string | any[]) {
	if (coords.length === 0) {
		return matrix === "#" ? 1 : 0;
	}

	let sum = 0;
	let coord = coords.shift();
	for (let i = -1; i <= 1; i++) {
		if (0 <= (coord + i) && (coord + i) < matrix.length) {
			sum += getNeighbours([...coords], matrix[coord + i]);
		}
	}
	return sum;
}

/* Part 1 */
function part1() {
	let matrix = matrix3D;
	for (let outer = 0; outer < 6; outer++) {
		const newMatrix = [];
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				for (let k = 0; k < matrix[i][j].length; k++) {
					let count = getNeighbours([i, j, k], matrix);

					if (newMatrix[i] === undefined) {
						newMatrix[i] = [];
					}
					if (newMatrix[i][j] === undefined) {
						newMatrix[i][j] = [];
					}

					if (matrix[i][j][k] === "#") {
						if (count === 3 || count === 4) {
							newMatrix[i][j][k] = "#";
						} else {
							newMatrix[i][j][k] = ".";
						}
					} else {
						if (count === 3) {
							newMatrix[i][j][k] = "#";
						} else {
							newMatrix[i][j][k] = ".";
						}
					}
				}
			}
		}

		matrix = newMatrix;
	}

	return matrix.reduce((acc, cur) => {
		return acc + cur.reduce((acc, cur) => {
			return acc + cur.filter(x => x === "#").length;
		}, 0);
	}, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let matrix = matrix4D;
	for (let outer = 0; outer < 6; outer++) {
		const newMatrix = [];
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				for (let k = 0; k < matrix[i][j].length; k++) {
					for (let l = 0; l < matrix[i][j][k].length; l++) {
						let count = getNeighbours([i, j, k, l], matrix);

						if (newMatrix[i] === undefined) {
							newMatrix[i] = [];
						}
						if (newMatrix[i][j] === undefined) {
							newMatrix[i][j] = [];
						}
						if (newMatrix[i][j][k] === undefined) {
							newMatrix[i][j][k] = [];
						}

						if (matrix[i][j][k][l] === "#") {
							if (count === 3 || count === 4) {
								newMatrix[i][j][k][l] = "#";
							} else {
								newMatrix[i][j][k][l] = ".";
							}
						} else {
							if (count === 3) {
								newMatrix[i][j][k][l] = "#";
							} else {
								newMatrix[i][j][k][l] = ".";
							}
						}
					}
				}
			}
		}

		matrix = newMatrix;
	}

	return matrix.reduce((acc, cur) => {
		return acc + cur.reduce((acc, cur) => {
			return acc + cur.reduce((acc, cur) => {
				return acc + cur.filter(x => x === "#").length;
			}, 0);
		}, 0);
	}, 0);
}

console.log("Part 2:", part2());
