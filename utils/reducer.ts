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
