type Callback<T> = (c: T, i: number) => number;
type ReduceCallback<T> = (acc: number, cur: T, index: number) => number;

export function sum(): ReduceCallback<number>;
export function sum<T>(callback: Callback<T>): ReduceCallback<T>;
export function sum<T>(callback?: Callback<T>): ReduceCallback<number> | ReduceCallback<T> {
	if (callback === undefined) {
		return (acc: number, cur: number, _i: number) => acc + cur;
	} else {
		return (acc: number, cur: T, index: number) => acc + callback(cur, index);
	}
}

export function product(): ReduceCallback<number>;
export function product<T>(callback: Callback<T>): ReduceCallback<T>;
export function product<T>(callback?: Callback<T>): ReduceCallback<number> | ReduceCallback<T> {
	if (callback === undefined) {
		return (acc: number, cur: number, _i: number) => acc * cur;
	} else {
		return (acc: number, cur: T, index: number) => acc * callback(cur, index);
	}
}

export function gcd(): ReduceCallback<number>;
export function gcd<T>(callback: Callback<T>): ReduceCallback<T>;
export function gcd<T>(callback?: Callback<T>): ReduceCallback<number> | ReduceCallback<T> {
	function gcd(a: number, b: number): number {
		while (b !== 0) {
			let t = b;
			b = a % b;
			a = t;
		}
		return a;
	}

	if (callback === undefined) {
		return (acc: number, cur: number, _i: number) => Math.abs(acc * cur) / gcd(acc, cur);
	} else {
		return (acc: number, cur: T, index: number) => {
			const c = callback(cur, index);
			return Math.abs(acc * c) / gcd(acc, c);
		};
	}
}

export function lcm(): ReduceCallback<number>;
export function lcm<T>(callback: Callback<T>): ReduceCallback<T>;
export function lcm<T>(callback?: Callback<T>): ReduceCallback<number> | ReduceCallback<T> {
	const cb = gcd();
	if (callback === undefined) {
		return (acc: number, cur: number, i: number) => Math.abs(acc * cur) / cb(acc, cur, i);
	} else {
		return (acc: number, cur: T, index: number) => {
			const c = callback(cur, index);
			return Math.abs(acc * c) / cb(acc, c, index);
		};
	}
}
