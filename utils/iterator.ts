export function* range(start: number, end: number, step: number = 1): Generator<number> {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}

export function* chunks<T>(iterable: Iterable<T>, size: number): Generator<T[]> {
    const iterator = iterable[Symbol.iterator]();

    let result = iterator.next();
    let chunk: T[] = [];

    while (!result.done) {
        chunk.push(result.value);

        if (chunk.length === size) {
            yield chunk;
            chunk = [];
        }

        result = iterator.next();
    }

    if (chunk.length > 0) {
        throw new Error(`Iterator cannot be chunked with a size of ${size}. ${chunk.length} items remain.`);
    }
}
