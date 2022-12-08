import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	let i = 0;
	let acc = 0;
	let completed = [];
	while (i != inputs.length - 1) {
		const rules = inputs[i].split(" ");
		if (completed.includes(i)) {
			return acc;
		}
		completed.push(i);
		switch (rules[0]) {
			case "acc":
				acc += parseInt(rules[1]);
				i++;
				break;
			case "jmp":
				i += parseInt(rules[1]);
				break;
			case "nop":
				i++;
		}
	}
	return acc;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function check(inputs) {
		let i = 0;
		let acc = 0;
		let completed = [];
		while (i != inputs.length - 1) {
			const rules = inputs[i].split(" ");
			if (completed.includes(i)) {
				return false;
			}
			completed.push(i);
			switch (rules[0]) {
				case "acc":
					acc += parseInt(rules[1]);
					i++;
					break;
				case "jmp":
					i += parseInt(rules[1]);
					break;
				case "nop":
					i++;
			}
		}
		return acc;
	}

	for (let i = 0; i < inputs.length; i++) {
		const newInputs = inputs.map((v, j) => {
			if (j === i) {
				const rules = v.split(" ");
				if (rules[0] === "nop") {
					rules[0] = "jmp";
					return rules.join(" ");
				} else if (rules[0] === "jmp") {
					rules[0] = "nop";
					return rules.join(" ");
				}
				return v;
			}
			return v;
		});
		if (check(newInputs)) {
			return check(newInputs).toString();
		}
	}
}

console.log("Part 2:", part2());
