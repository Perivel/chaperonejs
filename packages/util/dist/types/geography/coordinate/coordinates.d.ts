import { CoordinatesInterface } from "./coordinates.interface";
import { Equatable } from "../../common";
/**
 * Coordinates
 *
 * Coordinates represents a geographic longitude/latitude pair.
 */
export declare class Coordinates implements CoordinatesInterface, Equatable {
    private readonly _long;
    private readonly _lat;
    constructor(longitude: number, latitude: number);
    /**
     * equals()
     *
     * equals() compares the suspect to the instance, to determine if they are equals.
     * @param suspect The suspect to compare.
     */
    equals(suspect: any): boolean;
    /**
     * latitude()
     *
     * gets the latitude.
     */
    get latitude(): number;
    /**
     * longitude()
     *
     * gets teh longitude.
     */
    get longitude(): number;
    toString(): string;
}
//# sourceMappingURL=coordinates.d.ts.map