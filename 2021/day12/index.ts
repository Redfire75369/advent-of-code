import {samples, full} from "./inputs";

const connections = full;

/* Part 1 */
function part1() {
	function findPaths(path: string[]) {
		const paths = [];

		const last = path[path.length - 1];
		if (last === "end") {
			return [path];
		}

		const links = connections[last];
		links.forEach(link => {
			if (link !== "start") {
				if (link === link.toUpperCase()) {
					paths.push(...findPaths(path.concat(link)));
				} else {
					if (!path.includes(link)) {
						paths.push(...findPaths(path.concat(link)));
					}
				}
			}
		});

		return paths;
	}

	return findPaths(["start"]).length;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	function findPaths(path: [string[], boolean]): string[][] {
		const paths: string[][] = [];

		const last = path[0][path[0].length - 1];
		if (last === "end") {
			return [path[0]];
		}

		const links = connections[last];
		links.forEach(link => {
			if (link !== "start") {
				if (link === link.toUpperCase()) {
					paths.push(...findPaths([path[0].concat(link), path[1]]));
				} else {
					const occurences = path[0].filter(x => x == link).length;
					if (occurences === 0) {
						paths.push(...findPaths([path[0].concat(link), path[1]]));
					} else if (!path[1] && occurences == 1) {
						paths.push(...findPaths([path[0].concat(link), true]));
					}
				}
			}
		});

		return paths;
	}

	return findPaths([["start"], false]).length;
}

console.log("Part 2:", part2());
