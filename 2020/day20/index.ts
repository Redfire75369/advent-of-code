import {sample, full} from "./inputs.ts";
import {product} from "../../utils/reducer.ts";
import {
	atCorner,
	atEdge,
	Corner,
	Edge,
	EdgeKind,
	Edges,
	oppositeEdges,
	otherCornerEdges,
	otherEdgeEdges,
	outerCornerEdges,
	outerEdgeEdges,
	Tile
} from "./tile.ts";

const inputs = full;

interface MatchedTile {
	tile: Tile,
	nonMatches: Edge[],
}

function findMatches(tiles: Tile[]): [MatchedTile[], MatchedTile[]] {
	const edges = tiles.flatMap(tile => [tile.edges.top, tile.edges.right, tile.edges.bottom, tile.edges.left]);
	const edgeMatches = edges.map(edge => {
		const rev = edge.reverse();
		return {
			edge: edge,
			standard: edges.filter(other => edge.tile !== other.tile && edge.matches(other)).length,
			reverse: edges.filter(other => edge.tile !== other.tile && rev.matches(other)).length,
		};
	});

	const none = edgeMatches.filter(s => s.standard + s.reverse === 0);
	const cornerTiles: MatchedTile[] = [];
	const edgeTiles: MatchedTile[] = [];
	none.forEach(match => {
		const nonMatches = none.filter(m2 => match.edge.tile === m2.edge.tile);
		if (nonMatches.length >= 2 && !cornerTiles.map(t => t.tile).includes(match.edge.tile)) {
			cornerTiles.push({
				tile: match.edge.tile,
				nonMatches: nonMatches.map(e => e.edge),
			});
		} else if (nonMatches.length === 1 && !edgeTiles.map(t => t.tile).includes(match.edge.tile)) {
			edgeTiles.push({
				tile: match.edge.tile,
				nonMatches: nonMatches.map(e => e.edge),
			});
		}
	});

	return [cornerTiles, edgeTiles];
}

/* Part 1 */
function part1() {
	let [cornerTiles, _] = findMatches(inputs)
	return cornerTiles.map(tile => tile.tile.index).reduce(product(), 1);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	interface TileParameters {
		outerEdgeKeys?: (keyof Edges)[];
		outerEdges?: Edge[][]; // Length 0-2
		reversible?: boolean;
		otherEdgeKey?: keyof Edges;
		otherEdge?: Edge;
	}

	function fitTile(possibilities: Tile[], {outerEdgeKeys, outerEdges, reversible, otherEdgeKey, otherEdge}: TileParameters): Tile[] {
		const solutions = [];
		for (let i = 0; i < possibilities.length; i++) {
			let tile = possibilities[i];
			for (let j = 1; j <= 8; j++) {
				let matchedKey = "";
				let outer: Edge[] | undefined = outerEdges ? (reversible ? outerEdges[i] : outerEdges[0]) : undefined;

				const matchesOuter = outerEdges ? outer.every(outer => {
					return outerEdgeKeys.some(key => {
						if (key === matchedKey) return false;
						const b = outer.matches(tile.edges[key]) || (reversible && outer.reverse().matches(tile.edges[key]))
						if (b) matchedKey = key
						return b;
					});
				}) : true;
				const matchesOther = otherEdge ? otherEdge.matches(tile.edges[otherEdgeKey]) : true;

				if (matchesOuter && matchesOther) {
					solutions.push(tile);
				}

				tile = tile.rotateRight();
				if (j % 4 === 0) {
					tile = tile.flipHorizontally();
				}
			}
		}
		return solutions;
	}

	function findSeaMonsters(grid: Tile): [number, number] {
		const offsets = seaMonster.flatMap((row, dy) => row.map((cell, dx) => cell === "#" ? [dx, dy] : null)
			.filter(offset => offset !== null));
		for (let j = 1; j <= 8; j++) {
			const pixels = grid.pixels;
			let monsters = 0;
			for (let y = 0; y < pixels.length - seaMonster.length + 1; y++) {
				for (let x = 0; x < pixels.length - seaMonster[0].length + 1; x++) {
					monsters += offsets.map(([dx, dy]) => pixels[y + dy][x + dx]).every(pixel => pixel) ? 1 : 0;
				}
			}
			if (monsters > 0) {
				return [monsters, offsets.length];
			}

			grid = grid.rotateRight();
			if (j % 4 === 0) {
				grid = grid.flipHorizontally();
			}
		}
		throw new Error("Found No Sea Monsters");
	}

	function addSolutions(id: number, solutions: Tile[]): number[] {
		if (solutions.length === 0) {
			return [id];
		} else {
			grids[id][y][x] = solutions[0];

			if (x !== 0 && y !== 0) {
				solutions.slice(1).forEach(solution => {
					grids.push([...grids[id].map(row => [...row])]);
					grids[grids.length - 1][y][x] = solution;
				});
			}
			return [];
		}
	}

	const seaMonster = [
		"                  # ",
		"#    ##    ##    ###",
		" #  #  #  #  #  #   ",
	].map(row => row.split(""));

	const gridLength = Math.sqrt(inputs.length);
	const grids: Tile[][][] = [new Array(gridLength).fill(new Array(gridLength).map(x => [...x])).map(x => [...x])];

	let x = 0;
	let y = 0;
	let inner = 0;
	let iterations = 0;

	let remainingTiles = inputs;
	let [remainingCornerTiles, remainingEdgeTiles] = findMatches(inputs);

	while (true) {
		const failedGrids = [];
		const corner = atCorner(x, y, inner, gridLength);
		const edge = atEdge(x, y, inner, gridLength);

		grids.forEach((grid, id) => {
			if (corner !== null) {
				const outer = outerCornerEdges[corner];
				const other = otherCornerEdges[corner];

				const parameters: TileParameters = {
					outerEdgeKeys: outer,
					outerEdges: [],
				};

				if (inner === 0) {
					parameters.outerEdges = remainingCornerTiles.map(t => t.nonMatches);
					parameters.reversible = true;
				} else {
					switch (corner) {
						case Corner.TopLeft:
							parameters.outerEdges.push([grid[y - 1][x].edges.bottom, grid[y][x - 1].edges.right]);
							break;
						case Corner.TopRight:
							parameters.outerEdges.push([grid[y - 1][x].edges.bottom, grid[y][x + 1].edges.left]);
							break;
						case Corner.BottomRight:
							parameters.outerEdges.push([grid[y][x + 1].edges.left, grid[y + 1][x].edges.top]);
							break;
						case Corner.BottomLeft:
							parameters.outerEdges.push([grid[y + 1][x].edges.top, grid[y][x - 1].edges.right]);
							break;
					}

					parameters.reversible = false;
				}

				if (corner !== Corner.TopLeft) {
					parameters.otherEdgeKey = other;
					switch (corner) {
						case Corner.TopRight:
							parameters.otherEdge = grid[y][x - 1].edges[oppositeEdges[other]];
							break;
						case Corner.BottomRight:
							parameters.otherEdge = grid[y - 1][x].edges[oppositeEdges[other]];
							break;
						case Corner.BottomLeft:
							parameters.otherEdge = grid[y][x + 1].edges[oppositeEdges[other]];
							break;
					}
				}

				const solutions = fitTile(remainingCornerTiles.map(t => t.tile), parameters);
				failedGrids.push(...addSolutions(id, solutions));
			} else if (edge !== null) {
				const outer = outerEdgeEdges[edge];
				const other = otherEdgeEdges[edge];

				const parameters: TileParameters = {
					outerEdgeKeys: outer,
					outerEdges: [],
					otherEdgeKey: other,
				};

				if (inner === 0) {
					parameters.outerEdges = remainingEdgeTiles.map(t => t.nonMatches);
					parameters.reversible = true;
				} else {
					switch (edge) {
						case EdgeKind.Top:
							parameters.outerEdges.push([grid[y - 1][x].edges.bottom]);
							break;
						case EdgeKind.Right:
							parameters.outerEdges.push([grid[y][x + 1].edges.left]);
							break;
						case EdgeKind.Bottom:
							parameters.outerEdges.push([grid[y + 1][x].edges.top]);
							break;
						case EdgeKind.Left:
							parameters.outerEdges.push([grid[y][x - 1].edges.right]);
							break;
					}

					parameters.reversible = false;
				}

				switch (edge) {
					case EdgeKind.Top:
						parameters.otherEdge = grid[y][x - 1].edges[oppositeEdges[other]];
						break;
					case EdgeKind.Right:
						parameters.otherEdge = grid[y - 1][x].edges[oppositeEdges[other]];
						break;
					case EdgeKind.Bottom:
						parameters.otherEdge = grid[y][x + 1].edges[oppositeEdges[other]];
						break;
					case EdgeKind.Left:
						parameters.otherEdge = grid[y + 1][x].edges[oppositeEdges[other]];
						break;
				}


				const solutions = fitTile(remainingEdgeTiles.map(t => t.tile), parameters);
				failedGrids.push(...addSolutions(id, solutions));
			}
		});

		failedGrids.reverse().forEach(id => grids.splice(id, 1));

		if (corner !== null) {
			remainingCornerTiles = remainingCornerTiles.filter(t => t.tile.index !== grids[0][y][x].index);
			remainingTiles = remainingTiles.filter(t => t.index !== grids[0][y][x].index);
			switch (corner) {
				case Corner.TopLeft: x++; break;
				case Corner.TopRight: y++; break;
				case Corner.BottomRight: x--; break;
				case Corner.BottomLeft: y--; break;
			}
		} else if (edge !== null) {
			remainingEdgeTiles = remainingEdgeTiles.filter(t => t.tile.index !== grids[0][y][x].index);
			remainingTiles = remainingTiles.filter(t => t.index !== grids[0][y][x].index);
			switch (edge) {
				case EdgeKind.Top: x++; break;
				case EdgeKind.Right: y++; break;
				case EdgeKind.Bottom: x--; break;
				case EdgeKind.Left:
					if (y === inner + 1) {
						x++
					} else {
						y--;
					}
			}
		}

		iterations++;
		if ((x === inner + 1 && y === inner + 1 && iterations > 4)
			|| (gridLength % 2 === 1 && iterations === 1 && x > gridLength / 2 && y === Math.floor(gridLength / 2))
			|| (gridLength % 2 === 0 && iterations === 4 && x === gridLength / 2 - 1 && y === gridLength / 2 - 1)) {
			inner++;
			iterations = 0;
			[remainingCornerTiles, remainingEdgeTiles] = findMatches(remainingTiles);
		}

		if ((inner >= gridLength / 2) ) break;
	}

	const pixels: boolean[][] = [];
	grids[0].forEach(row => {
		const tiles = row.map(tile => {
			return tile.pixels.slice(1, tile.pixels.length - 1)
				.map(row => row.slice(1, row.length - 1));
		});
		for (let c = 0; c < tiles[0].length; c++) {
			const row: boolean[] = [];
			for (let r = 0; r < tiles.length; r++) {
				row.push(...tiles[r][c]);
			}
			pixels.push(row);
		}
	});
	const grid = new Tile(0, pixels);

	const waves = grid.pixels.reduce((acc, row) => acc + row.reduce((acc, pixel) => acc + (pixel ? 1 : 0), 0), 0);
	const monsters = findSeaMonsters(grid);
	return waves - monsters[0] * monsters[1];
}


console.log("Part 2:", part2());
