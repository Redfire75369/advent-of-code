import {sample, full, Blueprint} from "./inputs";
import {product} from "../../utils/reducer.ts";

const inputs = full;

interface State {
	ore: number,
	clay: number,
	obsidian: number,
	geodes: number,
	robots: {
		ore: number,
		clay: number,
		obsidian: number,
	},
}

function checkBlueprint(blueprint: Blueprint, totalDepth: number): number {
	let maxRobots = {
		ore: Math.max(blueprint.ore, blueprint.clay, blueprint.obsidian[0], blueprint.geodes[0]),
		clay: blueprint.obsidian[1],
		obsidian: blueprint.geodes[1],
	};
	let maxGeodes = 0;

	function search(state: State, depth: number) {
		if (depth >= totalDepth || (state.geodes + (totalDepth - 1 - depth) * (totalDepth - depth) / 2) <= maxGeodes) {
			return;
		}
		if (state.geodes > maxGeodes) {
			maxGeodes = state.geodes;
		}

		if (state.robots.obsidian > 0) {
			const now = state.ore >= blueprint.geodes[0] && state.obsidian >= blueprint.geodes[1];
			const skip = now ? 0 : Math.max(Math.ceil((blueprint.geodes[0] - state.ore) / state.robots.ore), Math.ceil((blueprint.geodes[1] - state.obsidian) / state.robots.obsidian));
			search({
				ore: state.ore + state.robots.ore * (1 + skip) - blueprint.geodes[0],
				clay: state.clay + state.robots.clay * (1 + skip) ,
				obsidian: state.obsidian + state.robots.obsidian * (1 + skip)  - blueprint.geodes[1],
				geodes: state.geodes + (totalDepth - 1 - (depth + skip)),
				robots: {...state.robots},
			}, depth + 1 + skip);
			if (now) {
				return;
			}
		}

		if (state.robots.clay > 0 && state.robots.obsidian <= maxRobots.obsidian) {
			const now = state.ore >= blueprint.obsidian[0] && state.clay >= blueprint.obsidian[1];
			const skip = now ? 0 : Math.max(Math.ceil((blueprint.obsidian[0] - state.ore) / state.robots.ore), Math.ceil((blueprint.obsidian[1] - state.clay) / state.robots.clay));
			search({
				ore: state.ore + state.robots.ore * (1 + skip) - blueprint.obsidian[0],
				clay: state.clay + state.robots.clay * (1 + skip) - blueprint.obsidian[1],
				obsidian: state.obsidian + state.robots.obsidian * (1 + skip),
				geodes: state.geodes,
				robots: {...state.robots, obsidian: state.robots.obsidian + 1}
			}, depth + 1 + skip);
		}

		if (state.robots.clay <= maxRobots.clay ) {
			const now = state.ore >= blueprint.clay;
			const skip = now ? 0 : Math.ceil((blueprint.clay - state.ore) / state.robots.ore);
			search({
				ore: state.ore + state.robots.ore * (1 + skip) - blueprint.clay,
				clay: state.clay + state.robots.clay * (1 + skip),
				obsidian: state.obsidian + state.robots.obsidian * (1 + skip),
				geodes: state.geodes,
				robots: {...state.robots, clay: state.robots.clay + 1}
			}, depth + 1 + skip);
		}

		if (state.robots.ore <= maxRobots.ore) {
			const now = state.ore >= blueprint.ore;
			const skip = now ? 0 : Math.ceil((blueprint.ore - state.ore) / state.robots.ore);
			search({
				ore: state.ore + state.robots.ore * (1 + skip) - blueprint.ore,
				clay: state.clay + state.robots.clay * (1 + skip),
				obsidian: state.obsidian + state.robots.obsidian * (1 + skip),
				geodes: state.geodes,
				robots: {...state.robots, ore: state.robots.ore + 1}
			}, depth + 1 + skip);
		}
	}

	const initialState = {
		ore: 0,
		clay: 0,
		obsidian: 0,
		geodes: 0,
		robots: {
			ore: 1,
			clay: 0,
			obsidian: 0,
		}
	};
	search(initialState, 0);

	return maxGeodes;
}

/* Part 1 */
function part1() {
	return inputs.map(blueprint => checkBlueprint(blueprint, 24))
		.reduce((acc, cur, i) => acc + cur * (i + 1), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return inputs.slice(0, 3).map(blueprint => checkBlueprint(blueprint, 32))
		.reduce(product(), 1);
}

console.log("Part 2:", part2());
