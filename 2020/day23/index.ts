import {sample, full} from "./inputs";

const inputs = full;

class Cup {
	public readonly label: number;
	public next: Cup | null;

	constructor(label: number) {
		this.label = label;
		this.next = null;
	}
}

function initRing(inputs): [Cup, Map<number, Cup>] {
	const cups: [number, Cup][] = inputs.map(i => [i, new Cup(i)]);
	cups.forEach(([_, cup], i) => {
		cup.next = cups[(i + 1) % inputs.length][1];
	});
	return [cups[0][1], new Map(cups)];
}

function playTurn(ring: Map<number, Cup>, current: Cup): Cup {
	const pickedUp = [current.next, current.next.next, current.next.next.next];
	current.next = pickedUp[2].next;

	let target = current.label;
	while (true) {
		target--;
		if (target === 0) {
			target = ring.size;
		}

		if (pickedUp.some(c => c.label === target)) continue;

		const destination = ring.get(target);
		const oldNext = destination.next;
		destination.next = pickedUp[0];
		pickedUp[0].next = pickedUp[1];
		pickedUp[1].next = pickedUp[2];
		pickedUp[2].next = oldNext;
		break;
	}

	return current.next;
}

/* Part 1 */
function part1() {
	let [current, ring] = initRing(inputs);

	for (let i = 0; i < 100; i++) {
		current = playTurn(ring, current);
	}

	let cup = ring.get(1).next;
	const labels = [];
	while (cup.label !== 1) {
		labels.push(cup.label);
		cup = cup.next;
	}
	return labels.join("");
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const moreInputs = [...inputs];

	for (let i = inputs.length; i < 1e6; i++) {
		moreInputs[i] = i + 1;
	}

	let [current, ring] = initRing(moreInputs);

	for (let i = 0; i < 1e7; i++) {
		current = playTurn(ring, current);
	}

	const cup = ring.get(1).next;
	return cup.label * cup.next.label;
}

console.log("Part 2:", part2());
