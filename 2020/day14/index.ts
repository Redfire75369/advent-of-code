import {samples, full} from "./inputs";

const inputs = full;

/* Part 1 */
function part1() {
	let memory = new Array(1000);
	let mask = [];
	for (let i = 0; i < inputs.length; i++) {
		let [cmd, val] = inputs[i].split(" = ");

		if (cmd === "mask") {
			mask = val.split("").reverse();
			continue;
		}
		let address = parseInt(cmd.split("[")[1].split("]")[0]);

		let change = (parseInt(inputs[i].split(" = ")[1]) >>> 0).toString(2).split("").reverse();
		memory[address] = parseInt(mask.map((v, i) => v === "X" ? (change[i] === undefined ? "0" : change[i]) : v)
			.reverse().join(""), 2);
	}

	return memory.reduce((acc, cur) => acc + cur, 0);
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let memory = [];
	let mask = [];
	for (let i = 0; i < inputs.length; i++) {
		let [cmd, val] = inputs[i].split(" = ");

		if (cmd === "mask") {
			mask = val.split("");
			continue;
		}
		let address = parseInt(cmd.split("[")[1].split("]")[0]).toString(2).split("");
		while (address.length < 36) {
			address.unshift("0");
		}

		for (let j = 0; j < mask.length; j++) {
			if (mask[j] === "1") {
				address[j] = "1";
			} else if (mask[j] === "X") {
				address[j] = "X";
			}
		}

		function setMemory(addresses: string[][], value) {
			let index = addresses[0].indexOf("X");
			if (index === -1) {
				addresses.forEach(address => memory[parseInt(address.join(""), 2)] = parseInt(value));
			} else {
				const newAddresses = addresses.map(address => {
					const addr1 = [...address];
					const addr2 = [...address];

					addr1.splice(index, 1, "0");
					addr2.splice(index, 1, "1");
					return [addr1, addr2];
				});
				setMemory(newAddresses.flat(), value);
			}
		}

		setMemory([address], val);
	}

	let sum = 0;
	for (let i in memory) {
		sum += memory[i];
	}
	return sum;
}

console.log("Part 2: " + part2());
