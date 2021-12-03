import { readFileSync } from "fs";
import { join } from "path";

function generateEmptyArray(dimensions: number, sizes: number[]) {
	if (dimensions === 0) {
		return ".";
	} else {
		const array = [];
		const size = sizes[0];
		sizes.shift();
		let subarray = generateEmptyArray(dimensions - 1, sizes);
		for (let i = 0; i < size; i++) {
			array[i] = subarray;
		}
		return array;
	}
}

function parseInputs(filePath): [string[][][], string[][][][]] {
	const matrix2D = readFileSync(join(__dirname, filePath), {encoding: "utf8"}).split("\n").slice(0, -1).map(x => {
		const arr = x.split("");
		const empty = generateEmptyArray(0, []);
		for (let i = 0; i < 6; i++) {
			if (typeof empty === "string") {
				arr.unshift(empty);
				arr.push(empty);
			}
		}
		return arr;
	});

	const empty1D = generateEmptyArray(1, [matrix2D[0].length]);
	for (let i = 0; i < 6; i++) {
		// @ts-ignore
		matrix2D.unshift(empty1D);
		// @ts-ignore
		matrix2D.push(empty1D);
	}

	const matrix3D = [matrix2D];
	const empty2D = generateEmptyArray(2, [matrix2D.length, matrix2D[0].length]);
	for (let i = 0; i < 6; i++) {
		// @ts-ignore
		matrix3D.unshift(empty2D);
		// @ts-ignore
		matrix3D.push(empty2D);
	}

	const matrix4D = [matrix3D];
	const empty3D = generateEmptyArray(3, [matrix3D.length, matrix2D.length, matrix2D[0].length]);
	for (let i = 0; i < 6; i++) {
		// @ts-ignore
		matrix4D.unshift(empty3D);
		// @ts-ignore
		matrix4D.push(empty3D);
	}

	return [matrix3D, matrix4D];
}

const sample = parseInputs("./sample.txt");
const full = parseInputs("./full.txt");

export {
	sample,
	full,
};
