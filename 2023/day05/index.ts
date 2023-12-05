import {sample, full} from "./inputs.ts";
import {chunks} from "../../utils/iterator.ts";

const {seeds, maps} = full;

/* Part 1 */
function part1() {
	let factors = seeds;
    for (const map of maps) {
		factors = factors.map(factor => {
            for (const range of map.ranges) {
                if (range.source <= factor && factor < range.source + range.length) {
                    return factor + range.destination - range.source;
                }
            }
			return factor;
		});
    }
	return Math.min(...factors);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let ranges: [number, number][] = [];
	for (const [start, range] of chunks(seeds, 2)) {
		ranges.push([start, start + range - 1]);
	}

    for (const map of maps) {
		ranges = ranges.flatMap<[number, number]>(([start, end]) => {
			let current = start;
			const newRanges = [];
			for (const {source, destination, length} of map.ranges) {
				let sourceMax = source + length - 1;
				if (sourceMax < current) {
					continue;
				}
				if (source > end || current > end) {
					break;
				}
				if (source > current) {
					newRanges.push([current, source - 1]);
				}
				newRanges.push([
					Math.max(current, source) + destination - source,
					Math.min(end, sourceMax) + destination - source
				]);
				current = Math.min(sourceMax, end) + 1;
			}
			if (current < end) {
				newRanges.push([current, end]);
			}
			return newRanges;
		});
    }
	return Math.min(...ranges.map(range => range[0]));
}

console.log("Part 2:", part2());
