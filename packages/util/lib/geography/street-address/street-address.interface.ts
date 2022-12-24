import { CountryInterface } from "../country";
import { LocalityInterface } from "../locality";
import { PostalCodeInterface } from "../postal-code";
import { RegionInterface } from "../region";
import { StreetInterface } from "../street";

/**
 * StreetAddressInterface
 *
 * StreetAddressInterface specifies the functionality of a street address.
 */

export interface StreetAddressInterface {


    /**
     * country
     *
     * country() gets the address country.
     */

    readonly country: CountryInterface;

    /**
     * locality
     *
     * gets the address locality.
     */

    readonly locality: LocalityInterface;

    /**
     * postalCode
     *
     * gets the address postal code.
     */

    readonly postalCode: PostalCodeInterface;

    /**
     * region
     *
     * gets the address region.
     */

    readonly region: RegionInterface;

    /**
     * street
     *
     * gets the street.
     */

    readonly street: StreetInterface;
}