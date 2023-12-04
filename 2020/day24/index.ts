import {sample, full} from "./inputs";
import {int} from "../../utils/int.ts";

const inputs = full;

function parseTiles(): Map<string, boolean> {
	const tiles = new Map<string, boolean>();

	inputs.forEach(input => {
		const coordinate: [number, number] = [0, 0];
		while (input !== "") {
			if (input.startsWith("s") || input.startsWith("n")) {
				const command = input.substring(0, 2).split("");
				input = input.substring(2);

				const move = command[1] === "e" ? 1 : -1;
				const axis = ((move === 1 && command[0] === "n") || (move === -1 && command[0] === "s")) ? 0 : 1;
				coordinate[axis] += move;
			} else {
				const command = input.substring(0, 1).split("")[0];
				input = input.substring(1);

				coordinate[0] += command === "e" ? 1 : -1;
				coordinate[1] += command === "e" ? 1 : -1;
			}
		}
		const tile = tiles.get(coordinate.join(",")) ?? false;
		tiles.set(coordinate.join(","), !tile);
	});

	return tiles;
}

/* Part 1 */
function part1() {
	const tiles = parseTiles();
	return [...tiles.values()].filter(s => s).length;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const tiles = parseTiles();

	const coordinates = [...tiles].map(([coordinate, _]) => {
		const [x, y] = coordinate.split(",").map(int());
		return [x, y]
	})
	let maxX = Math.max(...coordinates.map(c => Math.abs(c[0]) + 1));
	let maxY = Math.max(...coordinates.map(c => Math.abs(c[1]) + 1));

	for (let i = 0; i < 100; i++) {
		const toChange = new Set<string>();
		for (let x = -maxX; x <= maxX; x++) {
			for (let y = -maxY; y <= maxY; y++) {
				const coordinate = [x, y].join(",");
				const tile = tiles.get(coordinate) ?? false;
				const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1]]
					.map(offset => [x + offset[0], y + offset[1]])
					.map(coordinate => [coordinate, tiles.get(coordinate.join(",")) ?? false]);

				const adjacency = offsets.filter(s => s[1]);
				if (!tile && adjacency.length === 2) {
					tiles.set(coordinate, false);
					toChange.add(coordinate);
				} else if (tile && (adjacency.length === 0 || adjacency.length > 2)) {
					toChange.add(coordinate);

					if (x === -maxX + 1 || x === maxX - 1) {
						maxX++;
					}
					if (y === -maxY + 1 || y === maxY - 1) {
						maxY++;
					}
				}
			}
		}

		for (const coordinate of toChange) {
			tiles.set(coordinate, !tiles.get(coordinate));
		}
	}

	return [...tiles.values()].filter(s => s).length;
}

console.log("Part 2:", part2());
