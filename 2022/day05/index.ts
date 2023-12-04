import {sample, full} from "./inputs";
import {sum} from "../../utils/reducer.ts";
import {clone} from "../../utils/clone.ts";

const inputs = full;

/* Part 1 */
function part1() {
	const stacks = clone(inputs.initial);
	inputs.moves.forEach(move => {
		for (let i = 0; i < move.amount; i++) {
			stacks[move.to].push(stacks[move.from].pop());
		}
	});
	return stacks.map(s => s[s.length - 1]).reduce(sum(), "");
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const stacks = clone(inputs.initial);
	inputs.moves.forEach(move => {
		const from = stacks[move.from];
		const moved = from.splice(from.length - move.amount);
		stacks[move.to].push(...moved);
	});
	return stacks.map(s => s[s.length - 1]).reduce(sum(), "");
}

console.log("Part 2:", part2());
