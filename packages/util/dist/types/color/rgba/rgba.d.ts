import { Equatable, Serializable } from '../../common';
import { RGBAInterface } from './rgba.interface';
/**
 * RGBA
 *
 * An RGBA color representation.
 */
export declare class RGBA implements RGBAInterface, Equatable, Serializable {
    private readonly _r;
    private readonly _g;
    private readonly _b;
    private readonly _a;
    /**
     * Creates an RGBA value.
     * @param r the r value.
     * @param g the g value.
     * @param b the b value.
     * @param a the alpha value.
     * @trows RGBAException when the RGBA values are invalid.
     */
    constructor(r: number, g: number, b: number, a?: number);
    /**
     * a
     *
     * gets the alpha value.
     */
    get a(): number;
    /**
     * b()
     *
     * gets the blue value.
     */
    get b(): number;
    equals(suspect: any): boolean;
    /**
     * g()
     *
     * gets the green value.
     */
    get g(): number;
    /**
     * r
     *
     * gets the red value.
     */
    get r(): number;
    serialize(): string;
    /**
     * setA()
     *
     * sets the alpha value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */
    setA(x: number): RGBA;
    /**
     * setB()
     *
     * sets the b value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */
    setB(x: number): RGBA;
    /**
     * setG()
     *
     * sets the g value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */
    setG(x: number): RGBA;
    /**
     * setR()
     *
     * sets the r value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */
    setR(x: any): RGBA;
    toString(): string;
}
//# sourceMappingURL=rgba.d.ts.map