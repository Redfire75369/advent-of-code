import {sample, full} from "./inputs.ts";
import {sum} from "../../utils/reducer.ts";

const inputs = full;

/* Part 1 */
function part1() {
	const disk = [];
	let ri = Math.floor((inputs.length - 1) / 2) * 2;
	let rcur = 0;

	for (let i = 0;  i < inputs.length; i++) {
		if (i % 2 === 0) {
			let toPush = inputs[i];
			if (i === ri) {
				toPush -= rcur;
			}

			disk.push(...Array.from({length: toPush}, () => i / 2));
		} else {
			let remaining = inputs[i];
			let toPush = inputs[ri] - rcur;
			while (remaining > 0) {
				if (remaining >= toPush) {
					disk.push(...Array.from({length: toPush}, () => ri / 2));
					ri -= 2;
					rcur = 0;
					remaining -= toPush;
				} else {
					disk.push(...Array.from({length: remaining}, () => ri / 2));
					rcur += remaining;
					remaining = 0;
				}
				toPush = inputs[ri] - rcur;
			}
		}

		if (ri <= i) {
			break;
		}
	}

	return disk.reduce(sum((c, i) => c * i), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let disk = [];
	for (let i = 0; i < inputs.length; i++) {
		disk.push({count: inputs[i], id: i % 2 === 0 ? i / 2 : null});
	}

	const pushed: number[] = [];
	const newDisk = [];

	for (let i = 0; i < disk.length; i++) {
		const block = disk[i];
		if (block.id === null) {
			let total = 0;
			for (let j = disk.length - 1; j > i; j--) {
				if (disk[j].id === null || disk[j].count === 0
					|| disk[j].count > (block.count - total) || pushed.includes(j)) {
					continue;
				}

				pushed.push(j);
				newDisk.push(disk[j]);
				total += disk[j].count;
				j = disk.length - 1;
			}

			if (total < block.count) {
				newDisk.push({count: block.count - total, id: null});
			}
		} else {
			if (pushed.includes(i)) {
				newDisk.push({count: block.count, id: null});
			} else {
				newDisk.push(block);
			}
		}
	}

	let t = 0;
	return newDisk.reduce(sum(({count: c, id: i}) => {
		t += c;
		return i !== null ? i * c * (t * 2 - c - 1) / 2 : 0;
	}), 0);
}

console.log("Part 2:", part2());
