import {sample, full} from "./inputs";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

function score(cards: number[]): number {
	return cards.reverse().reduce(sum((c, i) => c * (i + 1)), 0);
}

/* Part 1 */
function part1() {
	const player = [...inputs[0]];
	const crab = [...inputs[1]];

	while (player.length > 0 && crab.length > 0) {
		const play = player.shift();
		const crabPlay = crab.shift();
		if (play > crabPlay) {
			player.push(play, crabPlay);
		} else if (crabPlay > play) {
			crab.push(crabPlay, play);
		} else {
			player.push(play);
			crab.push(crabPlay);
		}
	}

	if (player.length > 0) {
		return score(player);
	} else {
		return score(crab);
	}
}

console.log("Part 1:", part1());

function playRecursiveCombat(playerDeck, crabDeck): [boolean, [number[], number[]]] {
	const player = [...playerDeck];
	const crab = [...crabDeck];
	const previous = {};

	while (player.length > 0 && crab.length > 0) {
		const uid = ["1:", ...player, "2:", ...crab].join(",");
		if (previous[uid]) {
			return [false, [player, crab]];
		}

		previous[uid] = true;

		const play = player.shift();
		const crabPlay = crab.shift();
		if (player.length >= play && crab.length >= crabPlay) {
			const [winner, _] = playRecursiveCombat(player.slice(0, play), crab.slice(0, crabPlay));
			if (!winner) {
				player.push(play, crabPlay);
			} else {
				crab.push(crabPlay, play);
			}
		} else if (play > crabPlay) {
			player.push(play, crabPlay);
		} else if (crabPlay > play) {
			crab.push(crabPlay, play);
		} else {
			player.push(play);
			crab.push(crabPlay);
		}
	}

	return [crab.length > 0, [player, crab]];
}

/* Part 2 */
function part2() {
	const [winner, [player, crab]] = playRecursiveCombat(inputs[0], inputs[1]);
	return winner ? score(crab) : score(player);
}

console.log("Part 2:", part2());
