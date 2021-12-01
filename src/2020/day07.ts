import read_input from "../utils";

const input = read_input(2020, 7, true);
const inputs = input.split("\n");

const rules = {};
inputs.forEach(x => {
	const [pri, sec] = x.split(" contain ");

	const primary = pri.split(" ").slice(0, 2).join(" ");

	rules[primary] = sec.split(", ").map((v, i, arr) => {
		let words = v.split(" ");
		if (v === "no other bags.") {
			return {
				number: 0,
				type: "none"
			}
		} else {
			return {
				number: parseInt(words[0]),
				type: i === arr.length - 1 ? `${words[1]} ${words[2].substr(0, words[2].length)}` : `${words[1]} ${words[2]}`
			}
		}
	});
});

function part1() {
	function hasShinyGold(rule) {
		if (rule === undefined) {
			return false;
		}
		if (rule.some(x => x.type === "shiny gold")) {
			return true;
		}

		return rule.some(x => hasShinyGold(rules[x.type]))
	}

	return Object.keys(rules).filter(x => hasShinyGold(rules[x])).length;
}

console.log("Part 1: " + part1());

function part2() {
	function countWithin(rule) {
		if (rule === undefined) {
			return 0;
		}

		return rule.reduce((acc, cur) => acc + cur.number * (1 + countWithin(rules[cur.type])), 0);
	}

	return countWithin(rules["shiny gold"]);
}

console.log("Part 2: " + part2());
