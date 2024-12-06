import {sample, full} from "./inputs.ts";

const [cardPublic, doorPublic] = full;

const MOD = 20201227;

function getLoop(publicKey: number): number {
	let i = 0;
	let j = 1;
	while (true) {
		j = (j * 7) % MOD;
		if (j === publicKey) {
			return i + 1;
		}
		i++;
	}
}

/* Part 1 */
function part1() {
	const cardLoop = getLoop(cardPublic);
	const doorLoop = getLoop(doorPublic);

	let j = 1;
	for (let i = 0; i < cardLoop; i++) {
		j = (j * doorPublic) % MOD;
	}
	return j;
}

console.log("Part 1:", part1());
