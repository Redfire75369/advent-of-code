import {sample, full} from "./inputs";

const [time, inputs] = full;

/* Part 1 */
function part1() {
	let ids = [];
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i] > 0) {
			ids.push(inputs[i]);
		}
	}

	let earliest = ids.map(id => {
		return {
			id: id,
			time: Math.ceil(time / id) * id
		};
	}).sort(({time: a}, {time: b}) => a - b);

	return earliest[0].id * (earliest[0].time - time);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let busses = inputs.map((v, i) => ({
		id: v,
		index: i
	})).filter(({id}) => id > 0);

	let inc = busses[0].id;
	let i = inc;
	let index = 1;

	while (true) {
		if (busses.every(v => (i + v.index) % v.id === 0)) {
			return i;
		}

		const bus = busses[index];
		if ((i + bus.index) % bus.id === 0) {
			inc *= bus.id;
			index++;
		}
		i += inc;
	}
}

console.log("Part 2:", part2());
