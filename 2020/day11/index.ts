import {sample, full} from "./inputs";

const inputs = full;

function nonRef2DArray(arr) {
	let new2DArr = [];
	arr.forEach(x => {
		let newArr = [];
		x.forEach(y => {
			newArr.push(y);
		});
		new2DArr.push(newArr);
	});
	return new2DArr;
}

/* Part 1 */
function part1() {
	function countAdjacentSeats(x, y) {
		const [minX, maxX] = [Math.max(0, x - 1), Math.min(x + 1, seats[0].length)];
		const [minY, maxY] = [Math.max(0, y - 1), Math.min(y + 1, seats.length)];

		let count = 0;
		for (let newY = minY; newY <= maxY; newY++) {
			for (let newX = minX; newX <= maxX; newX++) {
				if (x !== newX || y !== newY) {
					if (seats[y][x] === "#") {
						count++;
					}
				}
			}
		}
		return count;
	}

	let seats = nonRef2DArray(inputs);
	let newSeats = nonRef2DArray(seats);
	let changed = true;

	do {
		changed = false;
		seats = nonRef2DArray(newSeats);
		for (let y = 0; y < seats.length; y++) {
			for (let x = 0; x < seats[y].length; x++) {
				if (newSeats[y][x] === "L" && countAdjacentSeats(x, y) === 0) {
					newSeats[y][x] = "#";
					changed = true;
				} else if (newSeats[y][x] === "#" && countAdjacentSeats(x, y) >= 4) {
					newSeats[y][x] = "L";
					changed = true;
				}
			}
		}
	} while (changed);


	return newSeats.reduce((acc, cur) => {
		return acc + cur.reduce((acc, cur) => {
			return acc + (cur === "#" ? 1 : 0);
		}, 0);
	}, 0);
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	function countVisibleSeats(x, y) {
		let count = 0;
		for (let i = 0; i < 8; i++) {
			let dx = 0;
			let dy = 0;
			let newX = x;
			let newY = y;
			let found = false;
			switch (i) {
				case 0:
					dy = -1;
					break;
				case 1:
					dx = 1;
					dy = -1;
					break;
				case 2:
					dx = 1;
					break;
				case 3:
					dx = 1;
					dy = 1;
					break;
				case 4:
					dy = 1;
					break;
				case 5:
					dx = -1;
					dy = 1;
					break;
				case 6:
					dx = -1;
					break;
				case 7:
					dx = -1;
					dy = -1;
					break;
			}
			newX += dx;
			newY += dy;
			while (newX >= 0 && newX <= seats[0].length - 1 &&
					newY >= 0 && newY <= seats.length - 1 &&
					!found) {
				if (!(newX === x && newY === y)) {
					if (seats[newY][newX] === "#") {
						count++;
						found = true;
					} else if (seats[newY][newX] === "L") {
						break;
					}
				}
				newX += dx;
				newY += dy;
			}
		}
		return count;
	}

	let seats = nonRef2DArray(inputs);
	let newSeats = nonRef2DArray(seats);
	let changed = true;
	let run = 0;

	do {
		changed = false;
		seats = nonRef2DArray(newSeats);

		for (let y = 0; y < seats.length; y++) {
			for (let x = 0; x < seats[y].length; x++) {
				if (newSeats[y][x] === "L" && countVisibleSeats(x, y) === 0) {
					newSeats[y][x] = "#";
					changed = true;
				} else if (newSeats[y][x] === "#" && countVisibleSeats(x, y) >= 5) {
					newSeats[y][x] = "L";
					changed = true;
				}
			}
		}
		run++
	} while (changed);

	return newSeats.reduce((acc, cur) => {
		return acc + cur.reduce((acc, cur) => {
			return acc + (cur === "#" ? 1 : 0);
		}, 0);
	}, 0);
}

console.log("Part 2: " + part2());
