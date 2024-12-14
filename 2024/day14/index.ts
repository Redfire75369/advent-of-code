import {sample, full} from "./inputs.ts";
import {product} from "../../utils/reducer.ts";

const inputs = full;
const size = inputs === full ? [101, 103] : [11, 7];

/* Part 1 */
function part1() {
	const quadrants = [0, 0, 0, 0];
	const midX = size[0] / 2;
	const midY = size[1] / 2;

	for (let [[px, py], [vx, vy]] of inputs) {
		px = ((px + vx * 100) % size[0] + size[0]) % size[0];
		py = ((py + vy * 100) % size[1] + size[1]) % size[1];

		if (px === (size[0] - 1) / 2 || py === (size[1] - 1) / 2) {
			continue;
		}

		if ((px + 1) < midX && (py + 1) < midY) {
			quadrants[0] += 1;
		} else if ((px + 1) < midX && (py + 1) > midY) {
			quadrants[1] += 1;
		} else if ((px + 1) > midX && (py + 1) < midY) {
			quadrants[2] += 1;
		} else if ((px + 1) > midX && (py + 1) > midY) {
			quadrants[3] += 1;
		}
	}
	return quadrants.reduce(product(), 1);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let robots = structuredClone(inputs);

	let i = 0;
	while (true) {
		i++;
		let robotSet = new Set();
		for (const robot of robots) {
			const [[px, py], [vx, vy]] = robot;
			robot[0][0] = ((px + vx) % size[0] + size[0]) % size[0];
			robot[0][1] = ((py + vy) % size[1] + size[1]) % size[1];
			const key = robot[0].join(",");
			robotSet.add(key);
		}

		if (robotSet.size === robots.length) {
			for (let y = 0; y < size[1]; y++) {
				let str = "";
				for (let x = 0; x < size[0]; x++) {
					str += robotSet.has([x, y].join(",")) ? "#" : " ";
				}
				console.log(str);
			}
			return i;
		}
	}
}

console.log("Part 2:", part2());
