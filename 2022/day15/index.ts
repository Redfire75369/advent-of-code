import {sample, full} from "./inputs";
import {sum} from "../../utils/reducer.ts";

const inputs = full;
const isFull = inputs.length === full.length;

function pointsOnRow(row: number, sensor: [number, number], radius: number): [number, number] | number {
	const dy = Math.abs(row - sensor[1]);
	if (radius < dy) {
		return null;
	}
	if (radius === dy) {
		return [sensor[0], sensor[0]];
	}

	const leftX = sensor[0] - (radius - dy);
	const rightX = sensor[0] + (radius - dy);

	return [leftX, rightX];
}

function mergeIntervals(intervals: [number, number][]): [number, number][] {
	intervals.sort((a, b) => a[0] - b[0]);
	const merged = [intervals[0]];

	for (let i = 1; i < intervals.length; i++) {
		 const previous = merged[merged.length - 1];
		 if (previous[1] >= intervals[i][0]) {
			 previous[1] = Math.max(previous[1], intervals[i][1]);
		 } else {
			 merged.push(intervals[i]);
		 }
	}
	return merged;
}

function intervalsOnRow(row: number): [number, number][] {
	const intervals = [];
	inputs.forEach(input => {
		const {sensor, beacon} = input;
		const radius = Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
		const points = pointsOnRow(row, sensor, radius);
		if (points !== null) {
			intervals.push(points);
		}
	});
	return mergeIntervals(intervals);
}

/* Part 1 */
function part1() {
	const intervals = intervalsOnRow(isFull ? 2000000 : 10);
	return intervals.reduce(sum(i => i[1] - i[0]), 0);
}

console.log("Part 1:", part1());

/* Part 2 */
function part2() {
	let point = null;
	for (let y = 0; y < (isFull ? 4000000 : 20); y++) {
		const intervals = intervalsOnRow(y);
		if (intervals.length > 1) {
			point = [intervals[0][1] + 1, y];
			break;
		}
	}
	return point[0] * 4000000 + point[1];
}

console.log("Part 2:", part2());
