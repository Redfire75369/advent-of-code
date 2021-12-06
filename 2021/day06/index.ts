import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	const fishes = [...inputs];
	for (let i = 0; i < 80; i++) {
		fishes.forEach((fish, j) => {
			if (fish === 0) {
				fishes[j] = 6;
				fishes.push(8);
			} else {
				fishes[j]--;
			}
		})
	}
	return fishes.length;
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const fishes = inputs.map(x => [x, 1]);

	for (let i = 0; i < 256; i++) {
		let newFish = 0;
		fishes.forEach(([fish, number], j) => {
			if (fish === 0) {
				fishes[j][0] = 6;
				newFish += number;
			} else {
				fishes[j][0]--;
			}
		});
		if (newFish > 0) {
			fishes.push([8, newFish]);
		}
	}

	return fishes.reduce((acc, x) => acc + x[1], 0);
}

console.log("Part 2: " + part2());
