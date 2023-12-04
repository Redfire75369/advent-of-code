import {sample, full} from "./inputs";
import {sum} from "../../utils/reducer";

const inputs = full;

/* Part 1 */
function part1() {
	return inputs.reduce(sum(([_, winning, current]) => {
		const matches = current.map(c => winning.includes(c)).reduce(sum(), 0);
		return matches === 0 ? 0 : Math.pow(2, matches - 1);
	}), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const cards = inputs.map(_ => 1);
	for (let i = 0; i < inputs.length; i++) {
		const [_, winning, current] = inputs[i];
		const matches = current.map(c => winning.includes(c)).reduce(sum(), 0);
		for (let j = i + 1; j <= i + matches; j++) {
			cards[j] += cards[i];
		}
	}
	return cards.reduce(sum(), 0);
}

console.log("Part 2:", part2());
