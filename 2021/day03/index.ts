import {sample, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	const gamma = [];
	const epsilon = [];

	for (let i = 0; i < inputs[0].length; i++) {
		let ones = 0;
		inputs.forEach(input => {
			if (input[i] === "1") {
				ones++;
			}
		});

		if (2 * ones > inputs.length) {
			gamma.push("1");
			epsilon.push("0");
		} else {
			gamma.push("0");
			epsilon.push("1");
		}
	}

	return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let oxygen = -1;
	let co2 = -1;

	let oxyInputs = [...inputs].map(x => [...x]);
	let co2Inputs = [...inputs].map(x => [...x]);

	for (let i = 0; i < inputs[0].length && oxygen !== -1 && co2 !== -1; i++) {
		const ones = oxyInputs.filter(input => input[i] === "1");

		if (oxyInputs.length !== 1) {
			const digit = (2 * ones.length >= oxyInputs.length) ? "1" : "0";
			oxyInputs = oxyInputs.filter(input => input[i] === digit);
		}

		if (co2Inputs.length !== 1) {
			const digit = (2 * ones.length < co2Inputs.length) ? "1" : "0";
			co2Inputs = co2Inputs.filter(input => input[i] === digit);
		}

		if (oxyInputs.length === 1) {
			oxygen = parseInt(oxyInputs[0].join(""), 2);
		}
		if (co2Inputs.length === 1) {
			co2 = parseInt(co2Inputs[0].join(""), 2);
		}
	}

	return oxygen * co2;
}

console.log("Part 2:", part2());
