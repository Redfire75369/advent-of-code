import {sample, full} from "./inputs.ts";

const inputs = full;

/* Part 1 */
function part1() {
	let x = 0;
	let y = 0;
	let rot = 90;

	for (let i = 0; i < inputs.length; i++) {
		let ins = inputs[i][0]
		let num = parseInt(inputs[i].substr(1));

		switch (ins) {
			case "N":
				y += num;
				break;
			case "S":
				y -= num;
				break;
			case "E":
				x += num;
				break;
			case "W":
				x -= num;
				break;
			case "R":
				rot = (rot + num) % 360;
				break;
			case "L":
				rot = (rot - num + 360) % 360;
				break;
			case "F":
				switch (rot) {
					case 0:
						y += num;
						break;
					case 90:
						x += num;
						break;
					case 180:
						y -= num;
						break;
					case 270:
						x -= num;
						break;
				}
				break;
		}
	}
	return Math.abs(x) + Math.abs(y);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let x = 0;
	let y = 0;
	let wayX = 10;
	let wayY = 1;

	for (let i = 0; i < inputs.length; i++) {
		let ins = inputs[i][0]
		let num = parseInt(inputs[i].substr(1))
		let angle = num / 90;

		switch (ins) {
			case "N":
				wayY += num;
				break;
			case "S":
				wayY -= num;
				break;
			case "E":
				wayX += num;
				break;
			case "W":
				wayX -= num;
				break;
			case "R":
				while (angle--) {
					[wayX, wayY] = [wayY, -wayX];
				}
				break;
			case "L":
				while (angle--) {
					[wayX, wayY] = [-wayY, wayX];
				}
				break;
			case "F":
				x += num * wayX;
				y += num * wayY;
				break;
		}
	}
	return Math.abs(x) + Math.abs(y);
}

console.log("Part 2:", part2());
