import {samples, full} from "./inputs";

const inputs = full;

type Knot = [number, number];

function moveHead(head: Knot, move: string) {
	if (move === "R") {
		head[0]++;
	} else if (move === "L") {
		head[0]--;
	} else if (move === "U") {
		head[1]++;
	} else {
		head[1]--;
	}
}

function pullKnot(head: Knot, tail: Knot) {
	const dx = head[0] - tail[0];
	const dy = head[1] - tail[1]

	const absDx = Math.abs(dx);
	const absDy = Math.abs(dy);
	if (absDx > 1 || absDy > 1) {
		if ((absDx === 2 || dx === 0) && (absDy === 2 || dy === 0)) {
			tail[0] += dx / 2;
			tail[1] += dy / 2;
		} else if (absDx > absDy) {
			tail[0] += dx /2;
			tail[1] += dy;
		} else {
			tail[0] += dx;
			tail[1] += dy / 2;
		}
	}
}

/* Part 1 */
function part1() {
	const head: [number, number] = [0, 0];
	const tail: [number, number] = [0, 0];
	const visited = new Set(["0,0"]);

	inputs.forEach(input => {
		const [move, amount] = input;
		for (let i = 0; i < amount; i++) {
			moveHead(head, move);
			pullKnot(head, tail);

			visited.add(tail.join(","));
		}
	});

	return visited.size;
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	const parts: [number, number][] = ".".repeat(10).split("").map(_ => [0, 0]);
	const visited = new Set(["0,0"]);

	inputs.forEach(input => {
		const [move, amount] = input;
		for (let i = 0; i < amount; i++) {
			moveHead(parts[0], move);
			parts.slice(1).forEach((part, i) => {
				pullKnot(parts[i], part);
			});

			visited.add(parts[9].join(","));
		}
	});
	return visited.size;
}

console.log("Part 2:", part2());
