import {sample, full} from "./inputs";

const inputs = full;

function isLowest(x, y) {
	const square = inputs[y][x];

	let lowest = true;
	for (let i = -1; i < 2; i++) {
		if (y + i >= 0 && y + i <= inputs.length - 1) {
			for (let j = -1; j < 2; j++) {
				if (x + j >= 0 && x + j <= inputs[0].length - 1) {
					if (!(i === 0 && j === 0) && Math.abs(i) !== Math.abs(j)) {
						if (inputs[y + i][x + j] <= square) {
							lowest = false;
						}
					}
				}
			}
		}
	}
	return lowest;
}

/* Part 1 */
function part1() {
	return inputs.reduce((acc, row, y) => {
		return acc + row.reduce((acc, square, x) => {
			return acc + (isLowest(x, y) ? 1 + square : 0);
		}, 0);
	}, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function findNearby(basin: [number, number][]) {
		let newBasin = [...basin];
		for (let square of basin) {
			const [x, y] = square;
			for (let i = -1; i < 2; i++) {
				if (y + i >= 0 && y + i <= inputs.length - 1) {
					for (let j = -1; j < 2; j++) {
						if (x + j >= 0 && x + j <= inputs[0].length - 1) {
							if (!(i === 0 && j === 0) && Math.abs(i) !== Math.abs(j)) {
								if (inputs[y + i][x + j] > inputs[y][x] && inputs[y + i][x + j] !== 9) {
									if (newBasin.findIndex(elem => elem[0] === x + j && elem[1] === y + i) === -1) {
										newBasin.push([x + j, y + i]);
									}
								}
							}
						}
					}
				}
			}
		}

		if (newBasin.length !== basin.length) {
			return findNearby(newBasin);
		} else {
			return newBasin;
		}

	}

	const basins = [];
	for (let y = 0; y < inputs.length; y++) {
		for (let x = 0; x < inputs[y].length; x++) {
			if (isLowest(x, y)) {
				const basin: [number, number][] = [[x, y]];
				basins.push(findNearby(basin).length)
			}
		}
	}

	const [one, two, three] = basins.sort((a, b) => b - a);
	return one * two * three;
}

console.log("Part 2:", part2());
