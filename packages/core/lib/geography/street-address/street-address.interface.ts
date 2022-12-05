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
     * country()
     *
     * country() gets the address country.
     */

    country(): CountryInterface;

    /**
     * locality()
     *
     * locality() gets the address locality.
     */

    locality(): LocalityInterface;

    /**
     * postalCode()
     *
     * postalCode() gets the address postal code.
     */

    postalCode(): PostalCodeInterface;

    /**
     * region()
     *
     * region gets the address region.
     */

    region(): RegionInterface;

    /**
     * street()
     *
     * street() gets the street.
     */

    street(): StreetInterface;
}