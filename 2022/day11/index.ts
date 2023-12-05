import {sample, full} from "./inputs.ts";
import {product} from "../../utils/reducer.ts";

const inputs = full;

/* Part 1 */
function part1() {
	const monkeys = inputs.map(m => {
		return {
			...m,
			items: [...m.items],
		};
	});
	const inspected = monkeys.map(_ => 0);

	for (let i = 0; i < 20; i++) {
		monkeys.forEach((monkey, m) => {
			monkey.items.forEach(item => {
				const worry = Math.floor(monkey.operation(item) / 3);
				if (worry % monkey.test === 0) {
					monkeys[monkey.throwTo[1]].items.push(worry);
				} else {
					monkeys[monkey.throwTo[0]].items.push(worry);
				}
				inspected[m]++;
			});
			monkey.items = [];
		});
	}

	return inspected.sort((a, b) => b - a).slice(0, 2).reduce(product(), 1);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const monkeys = inputs.map(m => {
		return {
			...m,
			items: [...m.items],
		};
	});
	const inspected = monkeys.map(_ => 0);

	const divisor = monkeys.map(s => s.test).reduce(product(), 1);

	for (let i = 0; i < 10000; i++) {
		monkeys.forEach((monkey, m) => {
			monkey.items.forEach(item => {
				const worry = monkey.operation(item) % divisor;
				if (worry % monkey.test === 0) {
					monkeys[monkey.throwTo[1]].items.push(worry);
				} else {
					monkeys[monkey.throwTo[0]].items.push(worry);
				}
				inspected[m]++;
			});
			monkey.items = [];
		});
	}

	return inspected.sort((a, b) => b - a).slice(0, 2).reduce(product(), 1);
}

console.log("Part 2:", part2());
