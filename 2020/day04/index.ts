import {sample, full} from "./inputs";

const inputs = full

/* Part 1 */
function part1() {
	const requiredFields = [
		"byr",
		"iyr",
		"eyr",
		"hgt",
		"hcl",
		"ecl",
		"pid"
	];

	let validated = 0;

	for (let i = 0; i < inputs.length; i++) {
		let input = inputs[i];
		let valid = true;

		for (let j = 0; j < requiredFields.length; j++) {
			valid = valid && input.includes(requiredFields[j]);
		}

		if (valid) {
			validated++;
		}
	}

	return validated;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const requiredFields = {
		byr: /^\d{4}$/,
		iyr: /^\d{4}$/,
		eyr: /^\d{4}$/,
		hgt: /^\d{2,3}(cm|in)$/,
		hcl: /^#[0-9a-f]{6}$/,
		ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
		pid: /^\d{9}$/
	};

	let validated = 0;

	for (let i = 0; i < inputs.length; i++) {
		let fields = inputs[i].split(/\s/);
		let valid = true;

		for (let j = 0; j < Object.keys(requiredFields).length; j++) {
			let validField = false;

			for (let k = 0; k < fields.length; k++) {
				let field = fields[k];
				let key = field.split(":")[0];

				if (key === Object.keys(requiredFields)[j]) {
					if (key.substring(1) === "yr") {
						if (field.split(":")[1].match(requiredFields[key])) {
							let year = parseInt(field.split(":")[1].match(/^\d{4}/)[0]);
							switch (key) {
								case "byr":
									validField = validField || (year <= 2002 && year >= 1920);
									break;
								case "iyr":
									validField = validField || (year <= 2020 && year >= 2010);
									break;
								case "eyr":
									validField = validField || (year <= 2030 && year >= 2020);
									break;
							}
						}
					} else if (key === "hgt") {
						if (field.split(":")[1].match(/^\d{3}cm/)) {
							validField = validField || (parseInt(field.split(":")[1].match(/^\d{3}/)[0]) <= 193
								&& parseInt(field.split(":")[1].match(/^\d{3}/)[0]) >= 150);
						} else if (field.split(":")[1].match(/^\d{2}in/)) {
							validField = validField || (parseInt(field.split(":")[1].match(/^\d{2}/)[0]) <= 76
								&& parseInt(field.split(":")[1].match(/^\d{2}/)[0]) >= 59);
						}
					} else {
						validField = validField || field.split(":")[1].match(requiredFields[key]) != null;
					}
				}
			}

			if (!validField) {
				valid = false;
			}
		}

		if (valid) {
			validated++;
		}
	}

	return validated;
}

console.log("Part 2:", part2());
