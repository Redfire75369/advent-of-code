export function int(radix = 10) {
	return (s: string) => parseInt(s, radix);
}

export function clamp(n: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, n));
}
