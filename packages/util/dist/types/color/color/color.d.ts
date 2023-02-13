import { Equatable, Serializable } from "../../common";
import { Hex } from "../hex";
import { RGBA } from "../rgba";
import { ColorInterface } from "./color.interface";
/**
 * Color
 *
 * A Color value.
 */
export declare class Color implements ColorInterface, Equatable, Serializable {
    private readonly _rgba;
    private readonly _hex;
    /**
     * Creates a Color value.
     * @param value the value of the color.
     */
    constructor(value: RGBA | Hex);
    /**
     * Black()
     *
     * creates a Black color.
     * @param a the alpha value, defaults to 1.0
     * @returns a color instance representing the Black color.
     */
    static Black(a?: number): Color;
    /**
     * Blue()
     *
     * creates a Color instance set to blue.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to blue.
     */
    static Blue(a?: number): Color;
    /**
     * FromHex()
     *
     * creates a Color instance from a Hex string.
     * @param v the hex value.
     * @returns a Color representing the Hex value provided.
     * @throws HexException when the Hex value is invalid.
     */
    static FromHex(v: string): Color;
    /**
     * FromRGBA()
     *
     * Creates a Color instance using the RGBA values provided.
     * @param r the r value.
     * @param g the g value.
     * @param b the b value.
     * @param a the a value.
     * @returns a Color instance set to the RGBA value provided.
     */
    static FromRGBA(r: number, g: number, b: number, a?: number): Color;
    /**
     * Green()
     *
     * creates a Color instance set to green.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to green.
     */
    static Green(a?: number): Color;
    /**
     * Red()
     *
     * creates a Color instance set to red.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to red.
     */
    static Red(a?: number): Color;
    /**
     * White()
     *
     * creates a Color instance set to white.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to White.
     */
    static White(a?: number): Color;
    equals(suspect: any): boolean;
    /**
     * hex()
     *
     * gets the hex value of the color.
     */
    get hex(): Hex;
    /**
     * rgba()
     *
     * gets the RGBA value of the color.
     */
    get rgba(): RGBA;
    serialize(): string;
    toString(): string;
}
//# sourceMappingURL=color.d.ts.map