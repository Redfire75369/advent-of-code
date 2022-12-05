export function int(radix = 10) {
	return (string) => parseInt(string, radix);
}
