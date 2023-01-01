/**
 * A Generic Node
 */
export interface NodeInterface<T> {
    readonly value: T;
    next: NodeInterface<T> | null;
    hasNext: boolean;
}
