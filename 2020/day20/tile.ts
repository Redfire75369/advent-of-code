export class Edge {
	public tile: Tile;
	public pixels: boolean[];

	public constructor(tile: Tile, pixels: boolean[]) {
		this.tile = tile;
		this.pixels = pixels;
	}

	public clone(): Edge {
		return new Edge(this.tile, [...this.pixels]);
	}

	public reverse(): Edge {
		const pixels = [...this.pixels];
		return new Edge(this.tile, pixels.reverse());
	}

	public matches(edge: Edge): boolean {
		return this.pixels.every((p, i) => p == edge.pixels[i]);
	}
}

export enum EdgeKind {
	Top = "top",
	Right = "right",
	Bottom = "bottom",
	Left = "left",
}

export type Edges = Record<EdgeKind, Edge>;

export enum Corner {
	TopLeft = "top-left",
	TopRight = "top-right",
	BottomRight = "bottom-right",
	BottomLeft = "bottom-left",
}

type OuterCornerEdges = Record<Corner, [keyof Edges, keyof Edges]>;
type OtherCornerEdges = Record<Corner, keyof Edges>;

type OuterEdgeEdges = Record<EdgeKind, [keyof Edges]>;
type OtherEdgeEdges = Record<EdgeKind, EdgeKind>;

type OppositeEdges = Record<EdgeKind, EdgeKind>;

export const outerCornerEdges: OuterCornerEdges = {
	[Corner.TopLeft]: [EdgeKind.Top, EdgeKind.Left],
	[Corner.TopRight]: [EdgeKind.Top, EdgeKind.Right],
	[Corner.BottomRight]: [EdgeKind.Right, EdgeKind.Bottom],
	[Corner.BottomLeft]: [EdgeKind.Bottom, EdgeKind.Left],
};

export const otherCornerEdges: OtherCornerEdges = {
	[Corner.TopLeft]: EdgeKind.Bottom,
	[Corner.TopRight]: EdgeKind.Left,
	[Corner.BottomRight]: EdgeKind.Top,
	[Corner.BottomLeft]: EdgeKind.Right,
};

export const outerEdgeEdges: OuterEdgeEdges = {
	[EdgeKind.Top]: [EdgeKind.Top],
	[EdgeKind.Right]: [EdgeKind.Right],
	[EdgeKind.Bottom]: [EdgeKind.Bottom],
	[EdgeKind.Left]: [EdgeKind.Left],
};

export const otherEdgeEdges: OtherEdgeEdges = {
	[EdgeKind.Top]: EdgeKind.Left,
	[EdgeKind.Right]: EdgeKind.Top,
	[EdgeKind.Bottom]: EdgeKind.Right,
	[EdgeKind.Left]: EdgeKind.Bottom,
};

export const oppositeEdges: OppositeEdges = {
	top: EdgeKind.Bottom,
	right: EdgeKind.Left,
	bottom: EdgeKind.Top,
	left: EdgeKind.Right,
};

export function atCorner(x: number, y: number, inner: number, length: number): Corner | null {
	switch (x) {
		case inner:
			switch (y) {
				case inner: return Corner.TopLeft;
				case (length - inner - 1): return Corner.BottomLeft;
			}
			break;
		case (length - inner - 1):
			switch (y) {
				case inner: return Corner.TopRight;
				case (length - inner - 1): return Corner.BottomRight;
			}
	}
	return null;
}

export function atEdge(x: number, y: number, inner: number, length: number): EdgeKind {
	if (y === inner) {
		return EdgeKind.Top;
	} else if (x === length - inner - 1) {
		return EdgeKind.Right;
	} else if (y === length - inner - 1) {
		return EdgeKind.Bottom;
	} else if (x === inner) {
		return EdgeKind.Left;
	}
}

export class Tile {
	public index: number;
	public edges: Edges;
	public pixels: boolean[][];

	public constructor(index: number, pixels: boolean[][], edges?: Edges) {
		this.index = index;
		this.pixels = pixels;

		if (edges) {
			this.edges = edges;
		} else {
			this.edges = {
				top: new Edge(this, [...this.pixels[0]]),
				right: new Edge(this, this.pixels.map(row => row[row.length - 1])),
				bottom: new Edge(this, [...this.pixels[this.pixels.length - 1]]),
				left: new Edge(this, this.pixels.map(row => row[0])),
			};
		}
	}

	public rotateRight(): Tile {
		const pixels = [];
		for (let c = 0; c < this.pixels[0].length; c++) {
			pixels.push([]);
			for (let r = this.pixels.length - 1; r > -1; r--) {
				pixels[c].push(this.pixels[r][c]);
			}
		}
		return new Tile(this.index, pixels,
			{
				top: this.edges.left.reverse(),
				right: this.edges.top.clone(),
				bottom: this.edges.right.reverse(),
				left: this.edges.bottom.clone(),
			}
		);
	}

	public flipHorizontally(): Tile {
		const pixels = [...this.pixels.map(row => {
			const newRow = [...row];
			return newRow.reverse();
		})];
		return new Tile(this.index, pixels,
			{
				top: this.edges.top.reverse(),
				right: this.edges.left.clone(),
				bottom: this.edges.bottom.reverse(),
				left: this.edges.right.clone(),
			}
		);
	}
}
