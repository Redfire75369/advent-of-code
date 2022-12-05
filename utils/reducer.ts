export function sum(callback = (c) => c) {
	return (acc, cur) => acc + callback(cur);
}

export function product(callback = (c) => c) {
	return (acc, cur) => acc * callback(cur);
}
