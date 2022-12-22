import { InvalidArgumentException } from '../../common';
/**
 * IdException
 *
 * Indicates an error with the ID.
 */
export declare class IdException extends InvalidArgumentException {
    constructor(message?: string);
}
