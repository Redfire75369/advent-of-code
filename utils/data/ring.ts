class RingElement<T> {
	public readonly value: T;
	public next: RingElement<T> | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
	}
}

class RingBuffer<T> {
	public readonly elements: Map<T, RingElement<T>>;

	constructor(values: T[]) {
		const length = values.length;

		const entries: [T, RingElement<T>][] = values.map(v => [v, new RingElement(v)]);
		entries.forEach(([_, element], index) => {
			element.next = entries[(index + 1) % length][1];
		});

		this.elements = new Map(entries);
	}

	public get(value: T): RingElement<T> {
		return this.elements.get(value);
	}

	public get size(): number {
		return this.elements.size;
	}
}
