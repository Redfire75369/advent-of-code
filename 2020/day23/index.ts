import {sample, full} from "./inputs";

const inputs = full;

function playTurn(ring: RingBuffer<number>, current: RingElement<number>): RingElement<number> {
	const pickedUp = [current.next, current.next.next, current.next.next.next];
	current.next = pickedUp[2].next;

	let target = current.value;
	while (true) {
		target--;
		if (target === 0) {
			target = ring.size;
		}

		if (pickedUp.some(c => c.value === target)) continue;

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
	const ring = new RingBuffer(inputs);
	let current = ring.elements.get(inputs[0]);

	for (let i = 0; i < 100; i++) {
		current = playTurn(ring, current);
	}

	let cup = ring.get(1).next;
	const labels = [];
	while (cup.value !== 1) {
		labels.push(cup.value);
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

	const ring = new RingBuffer(inputs);
	let current = ring.elements.get(inputs[0]);

	for (let i = 0; i < 1e7; i++) {
		current = playTurn(ring, current);
	}

	const cup = ring.get(1).next;
	return cup.value * cup.next.value;
}

console.log("Part 2:", part2());
