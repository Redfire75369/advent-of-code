import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	const ring = [...inputs].map((_, i) => i);
	inputs.forEach((input, i) => {
		const index = ring.indexOf(i);
		ring.splice(index, 1);
		const newIndex = (index + input) % ring.length;
		ring.splice(newIndex, 0, i);
	});
	const zero = ring.indexOf(inputs.indexOf(0));
	return inputs[ring[(zero + 1000) % ring.length] % inputs.length]
		+ inputs[ring[(zero + 2000) % ring.length] % inputs.length]
		+ inputs[ring[(zero + 3000) % ring.length] % inputs.length];
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const ring = [...inputs].map((_, i) => i);
	const values = [...inputs].map(v => v * 811589153);
	for (let i = 0; i < 10; i++) {
		inputs.forEach((input, i) => {
			const index = ring.indexOf(i);
			ring.splice(index, 1);
			const newIndex = (index + input * 811589153) % ring.length;
			ring.splice(newIndex, 0, i);
		});
	}
	const zero = ring.indexOf(values.indexOf(0));
	return values[ring[(zero + 1000) % ring.length] % values.length]
		+ values[ring[(zero + 2000) % ring.length] % values.length]
		+ values[ring[(zero + 3000) % ring.length] % values.length];
}

console.log("Part 2:", part2());
