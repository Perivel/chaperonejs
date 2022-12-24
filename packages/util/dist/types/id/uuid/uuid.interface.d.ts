import { IddentifierInterface } from "../id";
/**
 * UUIDInterface
 *
 * UUIDInterface specifies the requirements for a UUID.
 */
export interface UUIDInterface extends IddentifierInterface {
    /**
     * version
     *
     * gets teh version of the UUID.
     */
    readonly version: number;
}
