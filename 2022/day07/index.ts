import {sample} from "./inputs";
import {sum} from "../../utils/reducer";

const inputs = sample;

type Dir = {
	[key: string]: Dir | number
}

function traverseWithKeys(dir: Dir | number, keys: string[]): Dir {
	if (typeof dir === "number") {
		throw new Error("Invalid Path");
	}
	if (keys.length === 0) {
		return dir;
	}
	let [first, ...rest] = [...keys];
	return traverseWithKeys(dir[first], rest);
}

function mapDirectories(): Dir {
	const currentPath: string[] = [];
	const root: Dir = {};

	inputs.forEach(input => {
		if (input[0] === "$") {
			const command = input[1];
			if (command === "cd") {
				const path = input[2];
				if (path === "/") {
					currentPath.splice(0, currentPath.length);
				} else if (path === "..") {
					currentPath.pop();
				} else {
					currentPath.push(path.trim());
				}
			}
		} else if (input[0] === "dir") {
			const current = traverseWithKeys(root, currentPath);
			const path = input[1];
			if (typeof current[path] !== "object") {
				current[path] = {};
			}
		} else {
			const current = traverseWithKeys(root, currentPath);
			current[input[1]] = parseInt(input[0]);
		}
	});

	return root;
}

function walk<A extends number[]>(dir: Dir, combiner: (A) => number): [number, number[]] {
	const results = [];
	const dirResults = [];
	for (const key in dir) {
		const current = dir[key];
		if (typeof current === "number") {
			results.push(current);
		} else {
			const [out, inner] = walk(current, combiner);
			results.push(out);
			dirResults.push(out, ...inner);
		}
	}
	return [combiner(results), dirResults];
}

/* Part 1 */
function part1() {
	const root = mapDirectories();
	const sizes = walk(root, a => a.reduce(sum(), 0));

	return sizes.flat().reduce(sum(c => c <= 100000 ? c : 0), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const root = mapDirectories();
	const sizes = walk(root, a => a.reduce(sum(), 0));
	const total = sizes[0];
	const required = (total - 40000000);

	if (required < 0) {
		return 0;
	}

	return Math.min(...sizes.flat().filter(s => s >= required));
}

console.log("Part 2:", part2());
