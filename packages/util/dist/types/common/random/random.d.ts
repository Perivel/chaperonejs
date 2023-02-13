import { RandomInterface } from './random.interface';
export declare class Random implements RandomInterface {
    private constructor();
    /**
     * Alpha()
     *
     * generates a random character string containing only alphabetical characters.
     * @param length the length of the string to generate
     * @returns A randomly generated string containing only alphabetical characters.
     */
    static Alpha(length: number): string;
    /**
     * AlphaNumeric()
     *
     * generates a random character string containing only alphanumberic characters.
     * @param length the length of the string to generate
     * @returns A randomly generated string containing only alphanumeric characters.
     */
    static AlphaNumeric(length: number): string;
    /**
     * Float()
     *
     * generates a random floating point number.
     * @param min the minimum number (inclusive)
     * @param max max the maximum number (inclusive)
     * @returns a random floating point value between the min and max.
     */
    static Float(min: number, max: number): number;
    /**
     * Integer()
     *
     * Generates a random integer.
     * @param min the minimum number (inclusive)
     * @param max the maximum number (inclusive)
     * @returns a random integer value between the min and max.
     */
    static Integer(min: number, max: number): number;
}
//# sourceMappingURL=random.d.ts.map