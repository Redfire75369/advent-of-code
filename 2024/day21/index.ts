import {sample, full} from "./inputs.ts";
import {int} from "../../utils/int.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

const numericKeys: Record<string, string> = {
	"7": "0,0",
	"8": "1,0",
	"9": "2,0",
	"4": "0,1",
	"5": "1,1",
	"6": "2,1",
	"1": "0,2",
	"2": "1,2",
	"3": "2,2",
	"0": "1,3",
	"A": "2,3",
};

const directionalKeys: Record<string, string> = {
	"<": "0,1",
	"^": "1,0",
	"v": "1,1",
	"A": "2,0",
	">": "2,1",
};

const cache = new Map<string, number>();

function minimumLength(seq: string[], limit: number, depth: number): number {
	const cacheKey = [limit, depth, seq].join("-");
	if (cache.has(cacheKey)) {
		return cache.get(cacheKey);
	}

	const start = depth === 0 ? [2, 3] : [2, 0];
	const avoid = depth === 0 ? [0, 3] : [0, 0];
	const keys = depth === 0 ? numericKeys : directionalKeys;

	let length = 0;
	for (const char of seq) {
		const [x1, y1] = keys[char].split(",").map(int());
		const queue: {x: number, y: number, prev: string[]}[] = [{x: start[0], y: start[1], prev: []}];

		let minimum = Infinity;
		while (queue.length > 0) {
			const {x, y, prev} = queue.shift();
			if (x === x1 && y === y1) {
				if (depth === limit) {
					minimum = Math.min(minimum, prev.length + 1);
				} else {
					minimum = Math.min(minimum, minimumLength([...prev, "A"], limit, depth + 1));
				}
				continue;
			}
			if (x === avoid[0] && y === avoid[1]) {
				continue;
			}

			if (y1 > y) {
				queue.push({x, y: y + 1, prev: [...prev, "v"]});
			} else if (y1 < y) {
				queue.push({x, y: y - 1, prev: [...prev, "^"]});
			}
			if (x1 > x) {
				queue.push({x: x + 1, y, prev: [...prev, ">"]});
			} else if (x1 < x) {
				queue.push({x: x - 1, y, prev: [...prev, "<"]});
			}
		}

		length += minimum;
		start[0] = x1;
		start[1] = y1;
	}

	cache.set(cacheKey, length);
	return length;
}

/* Part 1 */
function part1() {
	return inputs.reduce(sum(input => parseInt(input.join("")) * minimumLength(input, 2, 0)), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	return inputs.reduce(sum(input => parseInt(input.join("")) * minimumLength(input, 25, 0)), 0);
}

console.log("Part 2:", part2());
