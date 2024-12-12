import {full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

/* Part 1 */
function part1() {
	let stones = inputs;

	for (let i = 0; i < 25; i++) {
		const newStones: number[] = [];
		for (const stone of stones) {
			const stoneS = stone.toString();
			if (stone === 0) {
				newStones.push(1);
			} else if (stoneS.length % 2 === 0) {
				const a = stoneS.slice(0, stoneS.length / 2);
				const b = stoneS.slice(stoneS.length / 2, stoneS.length);
				newStones.push(parseInt(a), parseInt(b));
			} else {
				newStones.push(stone * 2024)
			}
		}
		stones = newStones;
	}

	return stones.length;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let stones: { [key: number]: number } = {};
	for (const stone of inputs) {
		stones[stone] ??= 0;
		stones[stone] += 1;
	}

	for (let i = 0; i < 75; i++) {
		let newStones: { [key: number]: number } = {};
		for (const key in stones) {
			const count = stones[key];
			stones[key] = 0;
			let intKey = parseInt(key);
			if (intKey === 0) {
				newStones[1] ??= 0;
				newStones[1] += count;
			} else if (key.length % 2 === 0) {
				const a = parseInt(key.slice(0, key.length / 2));
				const b = parseInt(key.slice(key.length / 2, key.length));
				newStones[a] ??= 0;
				newStones[b] ??= 0;
				newStones[a] += count;
				newStones[b] += count;
			} else {
				newStones[intKey * 2024] ??= 0;
				newStones[intKey * 2024] += count;
			}
		}
		stones = newStones;
	}

	return Object.values(stones).reduce(sum(), 0);
}

console.log("Part 2:", part2());
