import {samples, full} from "./inputs";

const [rules, inputs] = full;

function validate(input: string, id, rules): [string[], boolean] {
	const rule = rules[id];
	if (typeof rule === "string") {
		const valid = input.startsWith(rule);
		return [[valid ? input.substring(rule.length) : input], valid];
	} else {
		let validRules = 0;
		const remaining = [];
		for (let i = 0; i < rule.length; i++) {
			const subrule = rule[i];
			let strings = [input];

			let valid = subrule.every(subrule => {
				strings = strings.map((string, i) => {
					const [newInputs, valid] = validate(string, subrule, rules);
					if (valid) {
						return newInputs;
					}
					return null;
				}).filter(x => x !== null).flat();
				return strings.length !== 0;
			});

			if (valid) {
				remaining.push(...strings);
				validRules++;
			}
		}

		if (validRules === 0) {
			return [[input], false];
		} else {
			return [remaining, true];
		}
	}
}

/* Part 1 */
function part1() {
	return inputs.filter(input => {
		const [left, valid] = validate(input, "0", rules);
		return valid && left.length === 0;
	}).length;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const loopingRules = {...rules};
	loopingRules[8] = [["42"], ["42", "8"]];
	loopingRules[11] = [["42", "31"], ["42", "11", "31"]];
	return inputs.filter(input => {
		const [left, valid] = validate(input, "0", loopingRules);
		return valid && left.some(str => str.length === 0);
	}).length;
}

console.log("Part 2:", part2());
