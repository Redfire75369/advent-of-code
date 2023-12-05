import {sample, full} from "./inputs.ts";

const inputs = full;

function findShortestPath(risks, x, y) {
	const queue = [{ x, y, cost: 0 }];
	const visited = new Set<string>();

	while (queue.length !== 0) {
		const {x, y, cost} = queue.shift();
		if ( x === risks[0].length - 1 && y === risks.length - 1) {
			return cost;
		}

		const [minX, maxX] = [Math.max(0, x - 1), Math.min(x + 1, risks[0].length - 1)];
		const [minY, maxY] = [Math.max(0, y - 1), Math.min(y + 1, risks.length - 1)];

		for (let newY = minY; newY <= maxY; newY++) {
			for (let newX = minX; newX <= maxX; newX++) {
				if (x === newX || y === newY) {
					if (!visited.has([newX, newY].join(","))) {
						visited.add([newX, newY].join(","));
						queue.push({x: newX, y: newY, cost: cost + risks[newY][newX]});
					}
				}
			}
		}
		queue.sort((a, b) => a.cost - b.cost);
	}
}

/* Part 1 */
function part1() {
	return findShortestPath(inputs,0, 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const newLength = inputs[0].length * 5;
	const newHeight = inputs.length * 5;
	const risks = new Array(newHeight).fill("")
		.map((_, y) => new Array(newLength).fill("").map((_, x) => {
			return 1 + (inputs[y % inputs.length][x % inputs[0].length] - 1
				+ Math.floor(x / inputs[0].length) + Math.floor(y / inputs.length)) % 9;
		}));

	return findShortestPath(risks,0, 0);
}

console.log("Part 2:", part2());
