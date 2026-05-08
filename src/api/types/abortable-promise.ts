export interface AbortablePromise<T> extends Promise<T> {
    abort: () => void;
}
