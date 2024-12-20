import {sample, full} from "./inputs.ts";
import {int} from "../../utils/int.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

interface Node {
	x: number;
	y: number;
	path: string[];
}

function findRoute(node: Node): string[] {
	const visited = [...node.path];
	const nodes = [node];

	while (nodes.length > 0) {
		const {x, y, path} = nodes.shift();
		if (x === end[0] && y === end[1]) {
			return path;
		}

		for (const [dx, dy] of dirs) {
			const x1 = x + dx;
			const y1 = y + dy;
			const key = [x1, y1].join(",");

			if (inputs[y1]?.[x1] === undefined || inputs[y1][x1] === "#" || visited.includes(key)) {
				continue;
			}

			nodes.push({x: x1, y: y1, path: [...path, key]});
			visited.push(key);
		}
	}

	return [];
}

const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

let start: [number, number];
let end: [number, number];
for (let y = 0; y < inputs.length; y++) {
	const i = inputs[y].indexOf("S");
	if (i !== -1) {
		start = [i, y];
	}
	const j = inputs[y].indexOf("E");
	if (j !== -1) {
		end = [j, y];
	}
}

const route = findRoute({x: start[0], y: start[1], path: [start.join(",")]});

/* Part 1 */
function part1() {
	const cheats: {[k: number]: number} = {};
	for (let i = 0; i < route.length; i++) {
		const [x, y] = route[i].split(",").map(int());
		for (const [dx, dy] of dirs) {
			const x1 = x + dx;
			const y1 = y + dy;

			const x2 = x1 + dx;
			const y2 = y1 + dy;
			if (inputs[y1]?.[x1] === "#") {
				const idx = route.indexOf([x2, y2].join(","));
				if (idx === -1) {
					continue;
				}

				const save = idx - 2 - i;
				if (save > 0) {
					cheats[save] = (cheats[save] ?? 0) + 1;
				}
			}
		}
	}

	return Object.entries(cheats).reduce(sum(([k, v]) => parseInt(k) >= 100 ? v : 0), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const cheats: {[k: number]: number} = {};
	for (let i = 0; i < route.length - 1; i++) {
		const [x0, y0] = route[i].split(",").map(int());
		for (let j = i + 1; j < route.length; j++) {
			const [x1, y1] = route[j].split(",").map(int());

			const dx = Math.abs(x1 - x0);
			const dy = Math.abs(y1 - y0);
			if (dx + dy <= 20) {
				const save = j - i - (dx + dy);
				if (save > 0) {
					cheats[save] = (cheats[save] ?? 0) + 1;
				}
			}
		}
		console.log(i);
	}

	return Object.entries(cheats).reduce(sum(([k, v]) => parseInt(k) >= 100 ? v : 0), 0);
}

console.log("Part 2:", part2());
