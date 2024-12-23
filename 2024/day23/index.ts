import {sample, full} from "./inputs.ts";

const inputs = full;

const nodes = new Set<string>();
const edges: Record<string, string[]> = {};
for (const [a, b] of inputs) {
	nodes.add(a);
	nodes.add(b);
	edges[a] ??= [];
	edges[b] ??= [];
	edges[a].push(b);
	edges[b].push(a);
}

function findNetworks(node: string, size: number, network: string[]): string[][] {
	if (network.length === size) {
		return [network];
	}

	if (edges[node].length < network.length || edges[node].length < size - 1) {
		return [];
	}

	return edges[node].flatMap(connected => {
		if (network.includes(connected)) {
			return [];
		}

		if (network.every(node => edges[connected].includes(node))) {
			return findNetworks(connected, size, [...network, connected]);
		}
		return [];
	});
}

/* Part 1 */
function part1() {
	const networks = new Set<string>();

	for (const node of nodes) {
		if (node.startsWith("t")) {
			for (const network of findNetworks(node, 3, [node])) {
				networks.add(network.sort().join(","));
			}
		}
	}

	return networks.size;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let components = nodes;

	for (let i = 2; i < nodes.size; i++) {
		const newComponents = new Set<string>();
		for (const component of components) {
			const network = component.split(",");
			const networks = findNetworks(network[network.length - 1], i, network);
			for (const network of networks) {
				newComponents.add(network.sort().join(","));
			}
		}

		if (newComponents.size === 1) {
			return newComponents.values().next().value;
		}
		components = newComponents;
	}

	return "";
}

console.log("Part 2:", part2());
