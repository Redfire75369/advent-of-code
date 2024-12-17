import {samples, full} from "./inputs.ts";

const inputs = full;
const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const start = [0, 0];
const end = [0, 0];
for (let y = 0; y < inputs.length; y++) {
	const xS = inputs[y].indexOf("S");
	if (xS !== -1) {
		start[0] = xS;
		start[1] = y;
	}
	const xE = inputs[y].indexOf("E");
	if (xE !== -1) {
		end[0] = xE;
		end[1] = y;
	}
}

function findRoutes() {
	interface Route {
		score: number,
		x: number,
		y: number,
		direction: [number, number],
		visited: string[]
	}

	let routes: Route[] = [
		{score: 0, x: start[0], y: start[1], direction: dirs[1], visited: [start.join(",")]},
	];

	const visited = new Map<string, number>();

	let minScore = -1;
	let currentScore = 0;
	const validRoutes = [];

	while (routes.length > 0) {
		const route = routes.shift();
		currentScore = route.score;

		if (route.x === end[0] && route.y === end[1]) {
			if (minScore === -1) {
				minScore = route.score;
				validRoutes.push(route);
			} else if (route.score === minScore) {
				validRoutes.push(route);
			}
		}

		if (minScore !== -1 && currentScore > minScore) {
			continue;
		}

		const key = [route.x, route.y, route.direction[0], route.direction[1]].join(",");
		if (visited.has(key) && visited.get(key) < route.score) {
			continue;
		}
		visited.set(key, route.score);

		for (const d of dirs) {
			const x1 = route.x + d[0];
			const y1 = route.y + d[1];
			const key = [x1, y1].join(",");

			if (route.visited.includes(key) || x1 < 0 || x1 >= inputs[0].length
				|| y1 < 0 || y1 >= inputs.length || inputs[y1][x1] === "#") {
				continue;
			}

			let score = route.score + 1;
			if (d !== route.direction) {
				score += 1000;
			}

			routes.push({
				score,
				x: x1,
				y: y1,
				direction: d,
				visited: [...route.visited, key]
			});
		}

		routes.sort((a, b) => a.score - b.score);
	}

	return validRoutes;
}

const routes = findRoutes();

/* Part 1 */
function part1() {
	return routes[0].score;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const tiles = new Set();

	for (const {visited} of routes) {
		for (const tile of visited) {
			tiles.add(tile);
		}
	}

	return tiles.size;
}

console.log("Part 2:", part2());
