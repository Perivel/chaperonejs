/**
 * Comparator
 *
 * A type indicating a comparator function. The comparator function takes two arguments, a and b.
 * The comparator function returns a negative number if a < b, 0 if a = b, and a positive number if a > b.
 */
export declare type Comparator<T> = (a: T, b: T) => number;
/**
 * compare()
 *
 * a default comparator function.
 * @param a the first operand
 * @param b the second operand.
 * @returns -1 if a < b. 0 if a = b. 1 if a > b
 */
export declare const compare: Comparator<any>;
//# sourceMappingURL=comparator.type.d.ts.map