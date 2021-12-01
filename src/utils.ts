import * as fs from "fs";
import * as path from "path";

export default function read_input(year: number, day: number, full: boolean, sample?: number): string {
	let file_path = full ? "full.txt" : sample !== undefined ? `sample${sample}.txt` : "sample.txt";
	return fs.readFileSync(path.join(process.cwd(), "src", year.toString(), "inputs", day < 10 ? `day0${day}` : `day${day}`, file_path), {encoding: "utf8"})
		.split("\n").slice(0, -1).join("\n");
}
