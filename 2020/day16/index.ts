import {samples, full} from "./inputs";

const [inputs, validators, myTicket, tickets] = full;

/* Part 1 */
function part1() {
	return tickets.reduce((acc, ticket) => {
		ticket.forEach(field => {
			let valid = false;
			for (const validator of validators) {
				if ((validator[0][0] <= field && field <= validator[0][1])
					|| ((validator[1][0] <= field && field <= validator[1][1]))) {
					valid = true;
				}
			}

			if (!valid) {
				acc += field;
			}
		});
		return acc;
	}, 0);
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
				if (!((validator[0][0] <= field && field <= validator[0][1])
					|| ((validator[1][0] <= field && field <= validator[1][1])))) {
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
				let index = indexes.indexOf(single[0]);
				console.log(i, indexes, index);
				if (index !== -1 && i !== single[1]) {
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
