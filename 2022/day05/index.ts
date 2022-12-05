import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	const stacks = [...inputs.initial.map(x => [...x])];
	inputs.moves.forEach(move => {
		for (let i = 0; i < move.amount; i++) {
			stacks[move.to].push(stacks[move.from].pop());
		}
	});
	return stacks.reduce((acc, stack) => {
		return acc + stack[stack.length - 1];
	}, "");
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const stacks = [...inputs.initial.map(x => [...x])];
	inputs.moves.forEach(move => {
		const from = stacks[move.from];
		const moved = from.splice(from.length - move.amount);
		stacks[move.to].push(...moved);
	});
	return stacks.reduce((acc, stack) => {
		return acc + stack[stack.length - 1];
	}, "");
}

console.log("Part 2: " + part2());
