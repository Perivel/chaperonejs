import { RandomInterface } from './random.interface';

export class Random implements RandomInterface {

    private constructor() {
        //
    }

    /**
     * Alpha()
     * 
     * generates a random character string containing only alphabetical characters.
     * @param length the length of the string to generate
     * @returns A randomly generated string containing only alphabetical characters.
     */

    public static Alpha(length: number): string {
        let str = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        for ( let i = 0; i < length; i++ ) {
            str += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        return str;
    }

    /**
     * AlphaNumeric()
     * 
     * generates a random character string containing only alphanumberic characters.
     * @param length the length of the string to generate
     * @returns A randomly generated string containing only alphanumeric characters.
     */

    public static AlphaNumeric(length: number): string {
        let str = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for ( let i = 0; i < length; i++ ) {
            str += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return str;
    }

    /**
     * Float()
     * 
     * generates a random floating point number.
     * @param min the minimum number (inclusive)
     * @param max max the maximum number (inclusive)
     * @returns a random floating point value between the min and max.
     */
    public static Float(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Integer()
     * 
     * Generates a random integer.
     * @param min the minimum number (inclusive)
     * @param max the maximum number (inclusive)
     * @returns a random integer value between the min and max.
     */

    public static Integer(min: number, max: number): number {
        min = Math.floor(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}