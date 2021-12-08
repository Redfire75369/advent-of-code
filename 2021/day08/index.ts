import {samples, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	return inputs.reduce((acc, [_, value]) => {
		return acc + value.reduce((acc, chars) => {
			return acc + ((chars.length === 2 || chars.length === 3 || chars.length === 4 || chars.length === 7) ? 1 : 0);
		}, 0);
	}, 0);
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const sevenSegment = {
		abcefg: "0",
		cf: "1",
		acdeg: "2",
		acdfg: "3",
		bcdf: "4",
		abdfg: "5",
		abdefg: "6",
		acf: "7",
		abcdefg: "8",
		abcdfg: "9",
	};
	return inputs.reduce((acc, [signals, digits]) => {
		const signalMap = {};
		const dualSignalMap = {};

		let one = signals.find(s => s.length === 2);
		dualSignalMap[one] = "cf";

		let seven = signals.find(s => s.length === 3);
		let sevenUnique = seven.split("").filter(c => !one.split("").includes(c)).join("");
		signalMap[sevenUnique] = "a";

		let four = signals.find(s => s.length === 4);
		let fourUnique = four.split("").filter(c => !one.split("").includes(c)).join("");
		dualSignalMap[fourUnique] = "bd";

		let eight = signals.find(s => s.length === 7);
		let eightUnique = eight.split("").filter(c => !one.includes(c) && !sevenUnique.includes(c) && !fourUnique.includes(c)).join("");
		dualSignalMap[eightUnique] = "eg";

		let fiveLen = signals.filter(s => s.length === 5);
		for (let i = 0; i < 2; i++) {
			if (fiveLen.every(s => s.includes(eightUnique[i]))) {
				signalMap[eightUnique[i]] = "g";
				signalMap[eightUnique[(i + 1) % 2]] = "e";
			}
		}
		for (let i = 0; i < 5; i++) {
			let char = fiveLen[0][i];
			if (fiveLen.every(s => s.includes(char)) && signalMap[char] === undefined) {
				signalMap[char] = "d";
			}
		}

		let sixLen = signals.filter(s => s.length === 6);
		for (let i = 0; i < 2; i++) {
			if (sixLen.every(s => s.includes(fourUnique[i]))) {
				signalMap[fourUnique[i]] = "b";
				signalMap[fourUnique[(i + 1) % 2]] = "d";
			}
		}
		for (let i = 0; i < 6; i++) {
			let char = sixLen[0][i];
			if (sixLen.every(s => s.includes(char)) && signalMap[char] === undefined) {
				signalMap[char] = "f";
			}
		}

		["a", "b", "c", "d", "e", "f", "g"].forEach(char => {
			if (signalMap[char] === undefined) {
				signalMap[char] = "c";
			}
		})

		return acc + parseInt(digits.map(digit => sevenSegment[digit.split("").map(c => signalMap[c]).sort().join("")]).join(""));
	}, 0);
}

console.log("Part 2: " + part2());
