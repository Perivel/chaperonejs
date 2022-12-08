import { Id } from "../id";
import { v1, v3, v4, v5, NIL, validate as isValidUUID, version as uuidVersion } from 'uuid';
import { UUIDInterface } from "./uuid.interface";
import { UUIDException } from '../exceptions';


/**
 * UUID
 *
 * UUID represents a UUID.
 */


export class UUID extends Id implements UUIDInterface {

    /**
     * Creates a UUID instance.
     * @param value The value of the UUID.
     * @throws UUIDException if the value is invalid.
     */

    constructor(value: string) {

        if (!isValidUUID(value)) {
            throw new UUIDException();
        }

        super(value);
    }

    /**
     * _ParseNamespace()
     * 
     * parses a namespace for v3 and v5 UUIDs.
     * @param namespace the namespace to parse.
     * @returns the parsed namespace.
     * @throws UUIDException when the namespace is not a valid UUID.
     */

    private static _ParseNamespace(namespace: UUIDInterface | string): string {
        let val = "";

        if (namespace instanceof UUID) {
            val = namespace.id();
        }
        else {
            // we validate that the string is a valid UUID.
            try {
                const uid = new UUID(namespace.toString());
                val = uid.toString();
            }
            catch (e) {
                // the namespace is not a valid UUID.
                throw new UUIDException('Invalid namespace.');
            }
        }

        return val;
    }

    /**
     * NIL()
     *
     * Creates the NIL UUID.
     * @returns a nil UUID (all zeros)
     */

    public static NIL(): UUID {
        return new UUID(NIL);
    }

    /**
     * V1()
     *
     * Generates a Version 1 UUID (Timestamp).
     * @returns A version 1 UUID.
     */

    public static V1(): UUID {
        return new UUID(v1());
    }

    /**
     * V3()
     *
     * Creates a Version 3 UUID (namespace with MD5).
     * @param name the name
     * @param namespace a UUID
     * @returns a Version 3 UUID.
     * @throws UUIDException when the namespace is not a valid UUID.
     */

    public static V3(name: string, namespace: UUID | string): UUID {
        return new UUID(v3(name, UUID._ParseNamespace(namespace)));
    }

    /**
     * V4()
     *
     * V4() generates a V4 UUID (random)
     * @returns a Version 4 UUID.
     */

    public static V4(): UUID {
        return new UUID(v4());
    }

    /**
     * V5()
     *
     * Creates a Version 5 UUID (namespace with SHA-1) UUID.
     * @param name the name
     * @param namespace the namespace
     * @returns a Version 5 UUID.
     * @throws UUIDException when the namespace is not a valid UUID.
     */

    public static V5(name: string, namespace: UUID|string): UUID {
        return new UUID(v5(name, UUID._ParseNamespace(namespace)));
    }

    /**
     * equals()
     *
     * equals() compares the suspect to the instance, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof UUID) {
            const other = suspect as UUID;
            isEqual = this.id() === other.id();
        }

        return isEqual;
    }

    /**
     * id()
     *
     * id() gets the value of the id.
     */

    public id(): string {
        return super.id() as string;
    }

    /**
     * version()
     *
     * gets teh version of the UUID.
     */

    public version(): number {
        return uuidVersion(this.id());
    }
}