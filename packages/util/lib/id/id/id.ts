import { IddentifierInterface } from "./id.interface";
import { Equatable } from "../../common";
import { IdException } from '../exceptions';

/**
 * Id
 *
 * Id represents a generic ID.
 */

export abstract class Id implements IddentifierInterface, Equatable {
    private readonly _val: any;

    /**
     * Creates a new Id instance.
     * @param value The value of the id.
     * @throws IdException when the value is invalid.
     */

    constructor(value: any) {

        if (!value) {
            throw new IdException();
        }
        this._val = value;
    }

    /**
     * equals()
     *
     * equals() compares the suspect to the intance, to determine if they are equal.
     * @param suspect The suspect to compare.
     */

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Id) {
            const other = suspect as Id;
            isEqual = this.value === other.value;
        }

        return isEqual;
    }

    /**
     * value
     *
     * gets the value of the ID.
     */

    public get value(): any {
        return this._val;
    }

    public toString(): string {
        return this.value.toString();
    }
}