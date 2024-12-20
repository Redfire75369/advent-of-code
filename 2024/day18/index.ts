import {sample, full} from "./inputs.ts";

const inputs = full;
const size = inputs === full ? 71 : 7;
const bytes = inputs === full ? 1024 : 12;

function findLength(map: string[][]): number {
	let nodes: [number, number, number][] = [[0, 0, 0]];
	let length: number = -1;

	const visited = ["0,0"];

	while (nodes.length > 0) {
		const [x, y, len] = nodes.shift();
		if (x === size - 1 && y === size - 1) {
			length = len;
			break;
		}

		const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

		for (const [dx, dy] of dirs) {
			const x1 = x + dx;
			const y1 = y + dy;
			const key = [x1, y1].join(",");

			if (map[y1]?.[x1] === undefined || map[y1][x1] === "#" || visited.includes(key)) {
				continue;
			}

			nodes.push([x1, y1, len + 1]);
			visited.push(key);
		}
	}

	return length;
}

/* Part 1 */
function part1() {
	const map: string[][] = [];
	for (let y = 0; y < size; y++) {
		map[y] = Array.from({ length: size }, () => ".");
	}

	for (let i = 0; i < bytes; i++) {
		const [x, y] = inputs[i];
		map[y][x] = "#";
	}

	return findLength(map);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const map: string[][] = [];
	for (let y = 0; y < size; y++) {
		map[y] = Array.from({ length: size }, () => ".");
	}

	for (let i = 0; i < bytes; i++) {
		const [x, y] = inputs[i];
		map[y][x] = "#";
	}

	for (let i = bytes; i < inputs.length; i++) {
		const [x, y] = inputs[i];
		map[y][x] = "#";
		if (findLength(map) === -1) {
			return inputs[i].join(",");
		}
	}

	return "-1,-1";
}

console.log("Part 2:", part2());
