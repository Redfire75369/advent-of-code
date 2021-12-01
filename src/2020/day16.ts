import read_input from "../utils";

const input = read_input(2020, 16, true, 1);
const inputs = input.split("\n\n").map(x => x.split("\n"));
const validators = inputs[0].map(input => {
	let validator = input.split(": ")[1].split(" or ");
	return [validator[0].split("-").map(x => parseInt(x)), validator[1].split("-").map(x => parseInt(x))];
});

const myTicket = inputs[1][1].split(",").map(x => parseInt(x));

const tickets = inputs[2].slice(1).map(input => {
	return input.split(",").map(x => parseInt(x));
});

/* Part 1 */
function part1() {
	let ret = [];

	tickets.forEach(ticket => {
		ticket.forEach(field => {
			let valid = false;
			for (const validator of validators) {
				if ((validator[0][0] <= field && field <= validator[0][1])
					|| ((validator[1][0] <= field && field <= validator[1][1]))) {
					valid = true;
				}
			}

			if (!valid) {
				ret.push(field);
			}
		});
	});

	return ret.reduce((acc, cur) => acc + cur, 0);
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	let indexes = [];
	tickets.forEach((ticket, index) => {
		ticket.forEach(field => {
			let valid = false;
			for (const validator of validators) {
				if ((validator[0][0] <= field && field <= validator[0][1])
					|| ((validator[1][0] <= field && field <= validator[1][1]))) {
					valid = true;
				}
			}

			if (!valid) {
				indexes.push(index);
			}
		});
	});

	indexes.reverse().forEach(index => tickets.splice(index, 1));

	let fieldIndexes = [];
	validators.forEach((validator, index) => {
		for (let i = 0; i < tickets[0].length; i++) {
			let every = true;
			tickets.forEach(ticket => {
				let field = ticket[i];
				if ((validator[0][0] <= field && field <= validator[0][1]) || ((validator[1][0] <= field && field <= validator[1][1]))) {
				} else {
					every = false;
				}
			});
			if (every) {
				if (fieldIndexes[i] === undefined) {
					fieldIndexes[i] = [];
				}
				fieldIndexes[i].push(index);
			}
		}
	});

	function flatArray(array) {
		for (let i = 0; i < array.length; i++) {
			if (array[i].length !== 1) {
				return false;
			}
		}
		return true;
	}

	let completed = [];
	while (!flatArray(fieldIndexes)) {
		let single = [-1, -1];
		fieldIndexes.forEach((indexes, i) => {
			if (indexes.length === 1 && completed.indexOf(indexes[0]) === -1) {
				single = [indexes[0], i];
				completed.push(indexes[0]);
			}
		});

		if (single[0] !== -1) {
			for (let i = 0; i < fieldIndexes.length; i++) {
				let indexes = fieldIndexes[i];
				let index = indexes.indexOf(single);
				if (index !== -1 && single[1] !== i) {
					fieldIndexes[i].splice(index, 1);
				}
			}
		}
	}

	return fieldIndexes.map(indexes => indexes[0]).reduce((acc, index, i) => {
		if (inputs[0][index].startsWith("departure")) {
			return acc * myTicket[i];
		} else {
			return acc;
		}
	}, 1);
}

console.log("Part 2: " + part2());
