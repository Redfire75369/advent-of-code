import {sample, full} from "./inputs.ts";

const inputs = full;

type Path = [[number, number], number];

function shortestPath(start: [number, number]): Path | null {
	const visited = new Set([start.join(",")]);
	const paths: Path[] = [[start, 0]];

	while (paths.length !== 0) {
		const [position, steps] = paths.shift();
		const [x, y] = position;
		const height = inputs.heights[y][x];

		if (x === inputs.end[0] && y === inputs.end[1]) {
			paths.splice(0, paths.length);
			paths.push([position, steps]);
			break;
		}

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (Math.abs(dx) === Math.abs(dy)) {
					continue;
				}

				const positionString = [x + dx, y + dy].join(",");
				if (!visited.has(positionString)) {
					const other = inputs.heights[y + dy]?.[x + dx];
					if (other <= height + 1) {
						paths.push([[x + dx, y + dy], steps + 1]);
						visited.add(positionString);
					}
				}
			}
		}
	}

	return paths[0] ?? null;
}

/* Part 1 */
function part1() {
	return shortestPath(inputs.start)[1];
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const lowest = [];
	inputs.heights.forEach((row, y) => {
		row.forEach((height, x) => {
			if (height === 0) {
				lowest.push([x, y]);
			}
		})
	});
	const paths = lowest.map(shortestPath).filter(path => path !== null);
	return Math.min(...paths.map(path => path[1]));
}

console.log("Part 2:", part2());
