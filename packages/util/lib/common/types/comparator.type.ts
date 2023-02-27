
/**
 * Comparator
 *
 * A type indicating a comparator function. The comparator function takes two arguments, a and b.
 * The comparator function returns a negative number if a < b, 0 if a = b, and a positive number if a > b.
 */

export type Comparator<T> = (a: T, b: T) => number;

/**
 * compare()
 * 
 * a default comparator function.
 * @param a the first operand
 * @param b the second operand.
 * @returns -1 if a < b. 0 if a = b. 1 if a > b
 */
export const compare: Comparator<any> = (a, b): number => {
    const aStr = a as String;
    const bStr = b as String;

    if (aStr === bStr) {
        return 0;
    }
    else {
        // they are not the same string.
        // so we determine order based on the Unicodeorder of each character.
        const lenToCheck = aStr.length < bStr.length ? aStr.length : bStr.length;
        let result = 0;
        let index = 0;
        let aCode = 0;
        let bCode = 0;

        for (index = 0; index < lenToCheck; index++) {
            aCode = aStr.charCodeAt(index);
            bCode = bStr.charCodeAt(index);

            if (aCode < bCode) {
                result = -1;
                break;
            }
            else if (aCode > bCode) {
                result = 1;
                break;
            }
        }

        // we perform one last check if the characters are still equal. That is, we compare the lengths of the string values.
        if (result === 0) {
            if (aStr.length < bStr.length) {
                result = -1;
            }
            else if (aStr.length > bStr.length) {
                result = 1;
            }
        }
        return result;
    }
}