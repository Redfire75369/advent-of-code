export function clone<T>(val: T): T {
	return JSON.parse(JSON.stringify(val));
}
