export function sum(callback = (c, _i) => c) {
	return (acc, cur, index) => acc + callback(cur, index);
}

export function product(callback = (c) => c) {
	return (acc, cur) => acc * callback(cur);
}
