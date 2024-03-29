import { IANAZone, DateTime } from 'luxon';
import { TimezoneInterface } from "./timezone.interface";
import { Equatable } from "../../common";
import { TimezoneException } from "../exceptions";

/**
 * Timezone
 *
 * Timezone represents a Timezone
 */

export class Timezone implements TimezoneInterface, Equatable {
    private readonly _id: string;
    private readonly _offset: number;
    private readonly _abbreviation: string;

    constructor(
        id: string,
        abbreviation: string,
        offset: number
    ) {
        this._id = id;
        this._abbreviation = abbreviation;
        this._offset = offset;
    }

    /**
     * FromId()
     *
     * FromeId() creates a Timezone from an Id.
     * @param id The Id of the timezone.
     */

    public static FromId(id: string): Timezone {
        if (!IANAZone.isValidZone(id)) {
            // invalid timezone.
            throw new TimezoneException();
        }

        // timezone exists.
        const zone = IANAZone.create(id);
        const dt = DateTime.fromJSDate(new Date()).setZone(zone);
        return new Timezone(zone.name, dt.toFormat("ZZZZ"), dt.offset);
    }

    /**
     * Local()
     * 
     * Creates a Timezone instance representing the local timezone (based on the machine)
     * @returns A Timezone instance representing local time.
     */

    public static Local(): Timezone {
        const local = DateTime.local();
        return new Timezone(
            local.zone.name, 
            local.toFormat('ZZZZ'), 
            local.offset
        );
    }

    /**
     * UTC()
     *
     * UTC() sets the timezone to UTC.
     */

    public static UTC(): Timezone {
        const dt = DateTime.fromJSDate(new Date()).setZone('utc');
        return new Timezone(dt.zone.name, dt.toFormat('ZZZZ'), dt.offset);
    }

    /**
     * abbreviation
     *
     * gets the timezone abbreviation()
     */

    public get abbreviation(): string {
        return this._abbreviation;
    }


    /**
     * equals()
     *
     * equals() compares the instnace to the suspect to determine if they are equal.
     * @param suspect the suspect to be compared.
     */

    public equals(suspect: any): boolean {

        let isEqual = false;

        if (suspect instanceof Timezone) {
            const other = suspect as Timezone;
            isEqual = (
                (this.id === other.id) &&
                (this.abbreviation === other.abbreviation) &&
                (this.utcOffset === other.utcOffset)
            );
        }

        return isEqual;
    }

    /**
     * id
     *
     * gets the Olson timezone id.
     */

    public get id(): string {
        return this._id;
    }

    /**
     * utcOffset
     *
     * gets the UTC offset of the timezone.
     */

    public get utcOffset(): number {
        return this._offset;
    }

    public toString(): string {
        return this.id;
    }
}