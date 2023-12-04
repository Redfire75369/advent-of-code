export function sum(callback = (c, _i: number) => c) {
	return (acc: number, cur, index: number) => acc + callback(cur, index);
}

export function product(callback = (c) => c) {
	return (acc: number, cur) => acc * callback(cur);
}
