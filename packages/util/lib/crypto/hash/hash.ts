import * as Bcrypt from 'bcryptjs';
import { Equatable } from "../../common";
import { Salt } from "../salt/salt";
import { HashInterface } from "./hash.interface";

/**
 * Hash
 *
 * A Hash.
 */

export class Hash implements HashInterface, Equatable {

    private readonly _value: string;

    constructor(value: string) {
        this._value = value;
    }

    /**
     * Create()
     *
     * creates a hash using the data and the salt
     * @param data the data to hash
     * @param salt the salt to use
     * @returns a hashed version of the data
     */

    public static async Create(data: string|Buffer, salt: Salt): Promise<Hash> {
        //return new Hash(await Bcrypt.hash(data, salt.value()));
        return new Promise((resolve, reject) => {
            Bcrypt.hash(data.toString(), salt.value, (error, hash) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(new Hash(hash));
                }
            });
        });
    }

    /**
      * value
      *
      * gets the value of the hash.
      */

    get value(): string {
        return this._value;
    }

    /**
     * equals()
     *
     * compares the instance to the suspect, to determine if they are equal.
     * @param suspect the suspect to compare
     */

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Hash) {
            isEqual = this.value === (suspect as Hash).value;
        }

        return isEqual;
    }

    public toString(): string {
        return this.value;
    }
}