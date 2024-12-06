import {sample, full} from "./inputs.ts";
import {int} from "../../utils/int.ts";

const [guard, obstacles] = full;

function move(obstacles: boolean[][], x: number, y: number, direction: number) {
	let x1 = x;
	let y1 = y;
	switch (direction) {
		case 0:
			y1 = y - 1;
			break;
		case 1:
			x1 = x + 1;
			break;
		case 2:
			y1 = y + 1;
			break;
		case 3:
			x1 = x - 1;
			break;
	}

	const edge = x1 < 0 || x1 >= obstacles[0].length || y1 < 0 || y1 >= obstacles.length;
	const obstacle = !edge && obstacles[y1][x1];

	return {
		obstacle,
		coordinate: obstacle ? [x, y] as [number, number] : [x1, y1] as [number, number],
		edge,
	}
}

function visits() {
	let direction = 0;
	const visited = new Set([guard.join(",")]);

	let result = {
		obstacle: false,
		coordinate: guard,
		edge: false,
	};

	while (!result.edge) {
		const [x, y] = result.coordinate;
		result = move(obstacles, x, y, direction);
		if (result.obstacle) {
			direction = (direction + 1) % 4;
		} else if (!result.edge) {
			visited.add(result.coordinate.join(","));
		}
	}

	return visited;
}

/* Part 1 */
function part1() {
	return visits().size;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const visited = visits();
	let loops = 0;

	for (const visit of visited) {
		const [x, y] = visit.split(",").map(int());
		if (x === guard[0] && y === guard[1]) {
			continue;
		}

		const editedObstacles = structuredClone(obstacles);
		editedObstacles[y][x] = true;

		let direction = 0;
		const visited = new Set();

		let result = {
			obstacle: false,
			coordinate: guard,
			edge: false,
		};

		while (!result.edge) {
			const [x, y] = result.coordinate;
			result = move(editedObstacles, x, y, direction);
			if (result.obstacle) {
				direction = (direction + 1) % 4;
			} else if (!result.edge) {
				const data = [...result.coordinate, direction].join(",");
				if (visited.has(data)) {
					loops++;
					break;
				}
				visited.add(data);
			}
		}
	}

	return loops;
}

console.log("Part 2:", part2());
