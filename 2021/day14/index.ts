import {sample, full} from "./inputs.ts";

const [template, insertionRules] = full;

/* Part 1 */
function part1() {
	function polymerise(polymer) {
		const insertions = [];
		for (let i = 0; i < polymer.length - 1; i++) {
			insertions.push(insertionRules[polymer.substring(i, i + 2)]);
		}
		const elements = polymer.split("");
		insertions.forEach((insertion, i) => {
			elements.splice(2 * i + 1, 0, insertion);
		});
		return elements.join("");
	}

	let polymer = template;
	for (let i = 0; i < 10; i++) {
		polymer = polymerise(polymer);
	}

	const characters: {[key: string]: number} = {};
	polymer.split("").forEach(char => characters[char] = characters[char] === undefined ? 1 : characters[char] + 1);
	return Math.max(...Object.values(characters)) - Math.min(...Object.values(characters));
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function polymerise(polymer: {[key: string]: number}) {
		const newPolymer = {};

		for (const pair in polymer) {
			const insertion = insertionRules[pair];
			const pairs =  [pair.substring(0, 1) + insertion, insertion + pair.substring(1, 2)];
			pairs.forEach(newPair => {
				newPolymer[newPair] = newPolymer[newPair] === undefined ? polymer[pair] : newPolymer[newPair] + polymer[pair];
			});
		}

		return newPolymer;
	}

	let polymer: {[key: string]: number} = {};

	for (let i = 0; i < template.length - 1; i++) {
		let substr = template.substring(i, i + 2);
		polymer[substr] = polymer[substr] === undefined ? 1 : polymer[substr] + 1;
	}

	for (let i = 0; i < 40; i++) {
		polymer = polymerise(polymer);
	}

	const characters: {[key: string]: number} = {};

	for (const pair in polymer) {
		const chars = pair.split("");
		const amount = polymer[pair];
		chars.forEach(char => {
			characters[char] = characters[char] === undefined ? amount : characters[char] + amount;
		});
	}

	return Math.ceil((Math.max(...Object.values(characters)) - Math.min(...Object.values(characters))) / 2);
}

console.log("Part 2:", part2());
