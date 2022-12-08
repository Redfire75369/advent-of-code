import {samples, full} from "./inputs";

const inputs = full;

const operators = {
	"+": (a, b) => a + b,
	"*": (a, b) => a * b,
};

function evaluate(expression, calculate) {
	if (expression.length === 0) {
		return 0;
	} else if (expression.length === 1) {
		return parseInt(expression[0]);
	}

	if (expression.includes(")")) {
		const close = expression.indexOf(")");
		const open = expression.lastIndexOf("(", close);

		const value = evaluate(expression.slice(open + 1, close), calculate);
		let newExpression = [...expression];
		newExpression.splice(open, close - open + 1, value);
		return evaluate(newExpression, calculate);
	}

	return calculate(expression, calculate);
}

/* Part 1 */
function part1() {
	return inputs.reduce((acc, input) => {
		const string = input.replaceAll("(", "( ").replaceAll(")", " )");
		const tokens = string.split(" ");

		return acc + evaluate(tokens, (expression, calculate) => {
			const operator = expression[1];
			const args = [expression[0], expression[2]].map(v => parseInt(v));
			return evaluate([operators[operator](...args), ...expression.slice(3)], calculate);
		});
	}, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return inputs.reduce((acc, input) => {
		const string = input.replaceAll("(", "( ").replaceAll(")", " )");
		const tokens = string.split(" ");

		return acc + evaluate(tokens, (expression, calculate) => {
			let index = expression.indexOf("+");
			if (index === -1) {
				index = 1;
			}
			const operator = expression[index];
			const args = [expression[index - 1], expression[index + 1]].map(v => parseInt(v));
			return evaluate([...expression.slice(0, index - 1), operators[operator](...args), ...expression.slice(index + 2)], calculate);
		});
	}, 0);
}

console.log("Part 2:", part2());
