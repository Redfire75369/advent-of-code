import {sample, full} from "./inputs";
import {product, sum} from "../../utils/reducer.ts";

const inputs = full;

/* Part 1 */
function part1() {
	const max: [number, number, number] = [12, 13, 14];
	return inputs.reduce(sum(([id, cubeSets]) => {
		const impossible = cubeSets.some(cubes => cubes[0] > max[0] || cubes[1] > max[1] || cubes[2] > max[2]);
		return impossible ? 0 : id;
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return inputs.reduce(sum(([_, cubeSets]) => {
		const min = [0, 0, 0];
		for (const cubes of cubeSets) {
			min[0] = Math.max(min[0], cubes[0]);
			min[1] = Math.max(min[1], cubes[1]);
			min[2] = Math.max(min[2], cubes[2]);
		}
		return min.reduce(product(), 1);
	}), 0);
}

console.log("Part 2:", part2());
