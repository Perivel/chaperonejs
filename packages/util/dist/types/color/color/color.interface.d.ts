import { HexInterface } from "../hex";
import { RGBAInterface } from "../rgba";
export interface ColorInterface {
    /**
     * hex()
     *
     * gets the hex value of the color.
     */
    hex(): HexInterface;
    /**
     * rgba()
     *
     * gets the RGBA value of the color.
     */
    rgba(): RGBAInterface;
}
