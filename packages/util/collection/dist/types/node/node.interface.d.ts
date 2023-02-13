/**
 * A Generic Node
 */
export interface NodeInterface<T> {
    readonly value: T;
    next: NodeInterface<T> | null;
    hasNext: boolean;
}
//# sourceMappingURL=node.interface.d.ts.map