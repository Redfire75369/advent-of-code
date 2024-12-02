import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

enum HandType {
	FIVE_KIND,
	FOUR_KIND,
	FULL_HOUSE,
	THREE_KIND,
	TWO_PAIR,
	ONE_PAIR,
	HIGH_CARD,
}

function sortHands(cardsA: string[], cardsB: string[], rank: (cards: string[]) => HandType, strength: string[]): number {
	const rankA = rank(cardsA);
	const rankB = rank(cardsB);

	if (rankA === rankB) {
		for (let i = 0; i < cardsA.length; i++) {
			const strengthA = strength.indexOf(cardsA[i]);
			const strengthB = strength.indexOf(cardsB[i]);

			if (strengthA === strengthB) {
				continue;
			}
			return strengthB - strengthA;
		}
		return 0;
	} else {
		return rankB - rankA;
	}
}

/* Part 1 */
function part1() {
	function rankHand(cards: string[]): HandType {
		const cardCount: {[key: string]: number} = {};
		for (const card of cards) {
			cardCount[card] = (cardCount[card] ?? 0) + 1;
		}

		const has = [0, 0]; // 2, 3
		for (const type in cardCount) {
			switch (cardCount[type]) {
				case 5:
					return HandType.FIVE_KIND;
				case 4:
					return HandType.FOUR_KIND;
				case 3:
					has[2] += 1;
					break;
				case 2:
					has[1] += 1;
					break;
			}
		}

		if (has[0] === 1 && has[1] === 1) {
			return HandType.FULL_HOUSE;
		} else if (has[1] === 1) {
			return HandType.THREE_KIND;
		} else if (has[0] === 2) {
			return HandType.TWO_PAIR
		} else if (has[0] === 1) {
			return HandType.ONE_PAIR;
		} else {
			return HandType.HIGH_CARD;
		}
	}

	const strengths = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

	return inputs.toSorted((a, b)  => sortHands(a[0], b[0], rankHand, strengths))
		.reduce(sum((c, i) => c[1] * (i + 1)), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const strengths = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

	function rankHand(cards: string[]): HandType {
		const cardCount: {[key: string]: number} = {};
		for (const card of cards) {
			cardCount[card] = (cardCount[card] ?? 0) + 1;
		}

		const three: [string, string?][] = [];
		const two: [string, string?][] = [];
		for (const type in cardCount) {
			const j = type === "J" ? 0 : (cardCount["J"] ?? 0);

			switch (cardCount[type]) {
				case 5 - j:
					return HandType.FIVE_KIND;
				case 4 - j:
					return HandType.FOUR_KIND;
				case 3:
					three.push([type]);
					break;
				case 2:
					two.push([type]);
					break;
			}

			if (cardCount[type] + j === 3) {
				three.push([type, "J"]);
			} else if (cardCount[type] + j === 2) {
				two.push([type, "J"]);
			}
		}

		for (const cards3 of three) {
			if (cards3.length === 2) {
				for (const cards2 of two) {
					if (cards2.length === 1 && cards2[0] !== cards3[0] && cards2[0] !== "J") {
						return HandType.FULL_HOUSE;
					}
				}
			} else if (two.length > 0) {
				return HandType.FULL_HOUSE;
			}
		}

		if (three.length > 0) {
			return HandType.THREE_KIND;
		}

		for (const cards2 of two) {
			if (cards2.length === 2) {
				for (const cards of two) {
					if (cards.length === 1 && cards[0] !== cards2[0]) {
						return HandType.TWO_PAIR;
					}
				}
			}
		}

		if (two.length > 0) {
			return HandType.ONE_PAIR;
		}

		return HandType.HIGH_CARD;
	}

	return inputs.toSorted((a, b)  => sortHands(a[0], b[0], rankHand, strengths))
		.reduce(sum((c, i) => c[1] * (i + 1)), 0);
}

console.log("Part 2:", part2());
